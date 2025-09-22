const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../middleware/auth');
const {
  sequelize,
  User,
  Profile,
  Image,
  Type,
  Category,
  Tag,
  Shop,
  Product,
  ProductCategory,
  ProductTag,
  ProductGallery,
  ShopStaff
} = require('../models');

// Helper function for pagination
function getPaginatorInfo(count, page = 1, perPage = 15) {
  const total = count;
  const currentPage = page;
  const lastPage = Math.ceil(total / perPage);
  const firstItem = (currentPage - 1) * perPage + 1;
  const lastItem = Math.min(currentPage * perPage, total);
  const hasMorePages = currentPage < lastPage;

  return {
    count: perPage,
    currentPage,
    firstItem: total > 0 ? firstItem : null,
    hasMorePages,
    lastItem: total > 0 ? lastItem : null,
    lastPage,
    perPage,
    total
  };
}

// Helper function to create slug from name
function createSlug(name) {
  return name.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

const resolvers = {
  Query: {
    // Product Queries
    products: async (_, args) => {
      const { first = 15, page = 1, text, status, shop_id } = args;
      const offset = (page - 1) * first;
      
      const where = {};
      if (text) {
        where.name = { [require('sequelize').Op.iLike]: `%${text}%` };
      }
      if (status) {
        where.status = status;
      }
      if (shop_id) {
        where.shop_id = shop_id;
      }

      const { count, rows } = await Product.findAndCountAll({
        where,
        limit: first,
        offset,
        include: [
          { model: Shop, as: 'shop' },
          { model: Type, as: 'type' },
          { model: Image, as: 'image' },
          { model: Image, as: 'gallery' },
          { model: Category, as: 'categories' },
          { model: Tag, as: 'tags' }
        ],
        order: [['created_at', 'DESC']]
      });

      return {
        data: rows,
        paginatorInfo: getPaginatorInfo(count, page, first)
      };
    },

    product: async (_, { id, slug }) => {
      const where = id ? { id } : { slug };
      return await Product.findOne({
        where,
        include: [
          { model: Shop, as: 'shop' },
          { model: Type, as: 'type' },
          { model: Image, as: 'image' },
          { model: Image, as: 'gallery' },
          { model: Category, as: 'categories' },
          { model: Tag, as: 'tags' }
        ]
      });
    },

    // Shop Queries
    shops: async (_, args) => {
      const { first = 15, page = 1, text, is_active } = args;
      const offset = (page - 1) * first;
      
      const where = {};
      if (text) {
        where.name = { [require('sequelize').Op.iLike]: `%${text}%` };
      }
      if (is_active !== undefined) {
        where.is_active = is_active;
      }

      const { count, rows } = await Shop.findAndCountAll({
        where,
        limit: first,
        offset,
        include: [
          { model: User, as: 'owner' },
          { model: User, as: 'staffs' },
          { model: Image, as: 'logo' },
          { model: Image, as: 'cover_image' }
        ],
        order: [['created_at', 'DESC']]
      });

      return {
        data: rows,
        paginatorInfo: getPaginatorInfo(count, page, first)
      };
    },

    shop: async (_, { id, slug }) => {
      const where = id ? { id } : { slug };
      return await Shop.findOne({
        where,
        include: [
          { model: User, as: 'owner' },
          { model: User, as: 'staffs' },
          { model: Image, as: 'logo' },
          { model: Image, as: 'cover_image' }
        ]
      });
    },

    // Category Queries
    categories: async (_, args) => {
      const { first = 15, page = 1, text, name, parent } = args;
      const offset = (page - 1) * first;
      
      const where = {};
      if (text || name) {
        where.name = { [require('sequelize').Op.iLike]: `%${text || name}%` };
      }
      if (parent !== undefined) {
        where.parent_id = parent;
      }

      const { count, rows } = await Category.findAndCountAll({
        where,
        limit: first,
        offset,
        include: [
          { model: Category, as: 'parent' },
          { model: Category, as: 'children' },
          { model: Type, as: 'type' },
          { model: Product, as: 'products' }
        ],
        order: [['created_at', 'DESC']]
      });

      return {
        data: rows,
        paginatorInfo: getPaginatorInfo(count, page, first)
      };
    },

    // Type Queries
    types: async (_, { text }) => {
      const where = {};
      if (text) {
        where.name = { [require('sequelize').Op.iLike]: `%${text}%` };
      }

      return await Type.findAll({
        where,
        include: [{ model: Image, as: 'image' }],
        order: [['created_at', 'DESC']]
      });
    },

    // User Queries
    me: async (_, __, { user }) => {
      if (!user) return null;
      
      return await User.findByPk(user.id, {
        include: [
          { model: Profile },
          { model: Shop, as: 'shops' },
          { model: Shop, as: 'managed_shop' }
        ]
      });
    },

    staffs: async (_, args) => {
      const { shop_id, first = 15, page = 1 } = args;
      const offset = (page - 1) * first;

      const { count, rows } = await User.findAndCountAll({
        include: [{
          model: Shop,
          as: 'managed_shop',
          where: { id: shop_id },
          through: { attributes: [] }
        }],
        limit: first,
        offset,
        order: [['created_at', 'DESC']]
      });

      return {
        data: rows,
        paginatorInfo: getPaginatorInfo(count, page, first)
      };
    }
  },

  Mutation: {
    // Authentication
    login: async (_, { input }) => {
      const { email, password } = input;
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      const token = generateToken(user);
      return {
        token,
        permissions: user.permissions || []
      };
    },

    register: async (_, { input }) => {
      const { name, email, password } = input;
      
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        is_active: true,
        permissions: ['customer']
      });

      // Create user profile
      await Profile.create({
        user_id: user.id,
        bio: ''
      });

      const token = generateToken(user);
      return {
        token,
        permissions: user.permissions || []
      };
    },

    logout: async () => {
      // In a stateless JWT system, logout is handled client-side
      return 'Logged out successfully';
    },

    changePassword: async (_, { input }, { requireAuth }) => {
      const user = requireAuth();
      const { oldPassword, newPassword } = input;

      const userRecord = await User.findByPk(user.id);
      const validPassword = await bcrypt.compare(oldPassword, userRecord.password);
      
      if (!validPassword) {
        throw new Error('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await userRecord.update({ password: hashedPassword });

      return {
        message: 'Password changed successfully',
        success: true
      };
    },

    forgetPassword: async (_, { input }) => {
      // This would typically send an email with reset token
      return {
        message: 'Password reset instructions sent to your email',
        success: true
      };
    },

    verifyForgetPasswordToken: async (_, { input }) => {
      return {
        message: 'Token verified successfully',
        success: true
      };
    },

    resetPassword: async (_, { input }) => {
      // This would validate the token and reset the password
      return {
        message: 'Password reset successfully',
        success: true
      };
    },

    // User Management
    banUser: async (_, { id }, { requireAuth }) => {
      requireAuth();
      const user = await User.findByPk(id);
      await user.update({ is_active: false });
      return user;
    },

    activeUser: async (_, { id }, { requireAuth }) => {
      requireAuth();
      const user = await User.findByPk(id);
      await user.update({ is_active: true });
      return user;
    },

    // Product Mutations
    createProduct: async (_, { input }, { requireAuth }) => {
      const user = requireAuth();
      
      const productData = {
        ...input,
        slug: createSlug(input.name),
        id: uuidv4()
      };

      const product = await Product.create(productData);

      // Handle categories
      if (input.categories && input.categories.length > 0) {
        const categoryAssociations = input.categories.map(categoryId => ({
          product_id: product.id,
          category_id: categoryId
        }));
        await ProductCategory.bulkCreate(categoryAssociations);
      }

      return await Product.findByPk(product.id, {
        include: [
          { model: Shop, as: 'shop' },
          { model: Type, as: 'type' },
          { model: Image, as: 'image' },
          { model: Image, as: 'gallery' },
          { model: Category, as: 'categories' },
          { model: Tag, as: 'tags' }
        ]
      });
    },

    updateProduct: async (_, { input }, { requireAuth }) => {
      requireAuth();
      
      const product = await Product.findByPk(input.id);
      if (!product) {
        throw new Error('Product not found');
      }

      await product.update(input);

      return await Product.findByPk(product.id, {
        include: [
          { model: Shop, as: 'shop' },
          { model: Type, as: 'type' },
          { model: Image, as: 'image' },
          { model: Image, as: 'gallery' },
          { model: Category, as: 'categories' },
          { model: Tag, as: 'tags' }
        ]
      });
    },

    deleteProduct: async (_, { id }, { requireAuth }) => {
      requireAuth();
      
      const product = await Product.findByPk(id, {
        include: [
          { model: Shop, as: 'shop' },
          { model: Type, as: 'type' },
          { model: Image, as: 'image' },
          { model: Image, as: 'gallery' },
          { model: Category, as: 'categories' },
          { model: Tag, as: 'tags' }
        ]
      });
      
      if (!product) {
        throw new Error('Product not found');
      }

      await product.destroy();
      return product;
    },

    // Shop Mutations
    createShop: async (_, { input }, { requireAuth }) => {
      const user = requireAuth();
      
      const shopData = {
        ...input,
        owner_id: user.id,
        slug: createSlug(input.name),
        id: uuidv4(),
        is_active: false,
        status: 'pending'
      };

      const shop = await Shop.create(shopData);

      return await Shop.findByPk(shop.id, {
        include: [
          { model: User, as: 'owner' },
          { model: User, as: 'staffs' },
          { model: Image, as: 'logo' },
          { model: Image, as: 'cover_image' }
        ]
      });
    },

    updateShop: async (_, { id, input }, { requireAuth }) => {
      requireAuth();
      
      const shop = await Shop.findByPk(id);
      if (!shop) {
        throw new Error('Shop not found');
      }

      await shop.update(input);

      return await Shop.findByPk(shop.id, {
        include: [
          { model: User, as: 'owner' },
          { model: User, as: 'staffs' },
          { model: Image, as: 'logo' },
          { model: Image, as: 'cover_image' }
        ]
      });
    },

    deleteShop: async (_, { id }, { requireAuth }) => {
      requireAuth();
      
      const shop = await Shop.findByPk(id);
      if (!shop) {
        throw new Error('Shop not found');
      }

      await shop.destroy();
      return shop;
    },

    approveShop: async (_, { input }, { requireAuth }) => {
      requireAuth();
      
      const shop = await Shop.findByPk(input.id);
      await shop.update({ 
        is_active: true, 
        status: 'approved',
        balance: { admin_commission_rate: input.admin_commission_rate || 0 }
      });

      return await Shop.findByPk(shop.id, {
        include: [
          { model: User, as: 'owner' },
          { model: User, as: 'staffs' },
          { model: Image, as: 'logo' },
          { model: Image, as: 'cover_image' }
        ]
      });
    },

    disApproveShop: async (_, { id }, { requireAuth }) => {
      requireAuth();
      
      const shop = await Shop.findByPk(id);
      await shop.update({ is_active: false, status: 'disapproved' });

      return await Shop.findByPk(shop.id, {
        include: [
          { model: User, as: 'owner' },
          { model: User, as: 'staffs' },
          { model: Image, as: 'logo' },
          { model: Image, as: 'cover_image' }
        ]
      });
    },

    // Staff Management
    addStaff: async (_, { input }, { requireAuth }) => {
      requireAuth();
      
      const user = await User.findOne({ where: { email: input.email } });
      if (!user) {
        throw new Error('User not found');
      }

      await ShopStaff.create({
        shop_id: input.shop_id,
        user_id: user.id
      });

      return 'Staff added successfully';
    },

    removeStaff: async (_, { id }, { requireAuth }) => {
      requireAuth();
      
      const user = await User.findByPk(id);
      await ShopStaff.destroy({ where: { user_id: id } });
      
      return user;
    },

    // Type Mutations
    createType: async (_, { input }, { requireAuth }) => {
      requireAuth();
      
      const typeData = {
        ...input,
        slug: input.slug || createSlug(input.name),
        id: uuidv4()
      };

      const type = await Type.create(typeData);

      return await Type.findByPk(type.id, {
        include: [{ model: Image, as: 'image' }]
      });
    },

    updateType: async (_, { id, input }, { requireAuth }) => {
      requireAuth();
      
      const type = await Type.findByPk(id);
      if (!type) {
        throw new Error('Type not found');
      }

      await type.update(input);

      return await Type.findByPk(type.id, {
        include: [{ model: Image, as: 'image' }]
      });
    },

    deleteType: async (_, { id }, { requireAuth }) => {
      requireAuth();
      
      const type = await Type.findByPk(id, {
        include: [{ model: Image, as: 'image' }]
      });
      
      if (!type) {
        throw new Error('Type not found');
      }

      await type.destroy();
      return type;
    },

    // Category Mutations
    createCategory: async (_, { input }, { requireAuth }) => {
      requireAuth();
      
      const categoryData = {
        ...input,
        slug: createSlug(input.name),
        id: uuidv4()
      };

      const category = await Category.create(categoryData);

      return await Category.findByPk(category.id, {
        include: [
          { model: Category, as: 'parent' },
          { model: Category, as: 'children' },
          { model: Type, as: 'type' }
        ]
      });
    }
  }
};

module.exports = resolvers;