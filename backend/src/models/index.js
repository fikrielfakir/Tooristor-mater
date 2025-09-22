const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Set to console.log to see SQL queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Define models
const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  permissions: { type: DataTypes.JSON, defaultValue: [] }
});

const Profile = sequelize.define('Profile', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  bio: DataTypes.TEXT,
  avatar_id: DataTypes.UUID
});

const Image = sequelize.define('Image', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  original: { type: DataTypes.STRING, allowNull: false },
  thumbnail: { type: DataTypes.STRING, allowNull: false }
});

const Type = sequelize.define('Type', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  icon: DataTypes.STRING,
  image_id: DataTypes.UUID
});

const Category = sequelize.define('Category', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  details: DataTypes.TEXT,
  icon: DataTypes.STRING,
  parent_id: DataTypes.UUID,
  type_id: DataTypes.UUID
});

const Tag = sequelize.define('Tag', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const Shop = sequelize.define('Shop', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  owner_id: { type: DataTypes.UUID, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: DataTypes.TEXT,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  logo_id: DataTypes.UUID,
  cover_image_id: DataTypes.UUID,
  address: DataTypes.JSON,
  settings: DataTypes.JSON,
  workhours: DataTypes.JSON,
  balance: DataTypes.JSON
});

const Product = sequelize.define('Product', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: DataTypes.TEXT,
  sku: DataTypes.STRING,
  shop_id: { type: DataTypes.UUID, allowNull: false },
  type_id: DataTypes.UUID,
  image_id: DataTypes.UUID,
  price: DataTypes.DECIMAL(10, 2),
  min_price: DataTypes.DECIMAL(10, 2),
  max_price: DataTypes.DECIMAL(10, 2),
  sale_price: DataTypes.DECIMAL(10, 2),
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  in_stock: { type: DataTypes.BOOLEAN, defaultValue: true },
  unit: DataTypes.STRING,
  height: DataTypes.STRING,
  width: DataTypes.STRING,
  length: DataTypes.STRING,
  city: DataTypes.STRING,
  product_type: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'publish' }
});

// Junction tables for many-to-many relationships
const ProductCategory = sequelize.define('ProductCategory', {
  product_id: { type: DataTypes.UUID, primaryKey: true },
  category_id: { type: DataTypes.UUID, primaryKey: true }
});

const ProductTag = sequelize.define('ProductTag', {
  product_id: { type: DataTypes.UUID, primaryKey: true },
  tag_id: { type: DataTypes.UUID, primaryKey: true }
});

const ProductGallery = sequelize.define('ProductGallery', {
  product_id: { type: DataTypes.UUID, primaryKey: true },
  image_id: { type: DataTypes.UUID, primaryKey: true }
});

const ShopStaff = sequelize.define('ShopStaff', {
  shop_id: { type: DataTypes.UUID, primaryKey: true },
  user_id: { type: DataTypes.UUID, primaryKey: true }
});

// Define associations
User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });
Profile.belongsTo(Image, { foreignKey: 'avatar_id', as: 'avatar' });

User.hasMany(Shop, { foreignKey: 'owner_id', as: 'shops' });
Shop.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

Shop.belongsToMany(User, { through: ShopStaff, foreignKey: 'shop_id', as: 'staffs' });
User.belongsToMany(Shop, { through: ShopStaff, foreignKey: 'user_id', as: 'managed_shop' });

Shop.belongsTo(Image, { foreignKey: 'logo_id', as: 'logo' });
Shop.belongsTo(Image, { foreignKey: 'cover_image_id', as: 'cover_image' });

Product.belongsTo(Shop, { foreignKey: 'shop_id' });
Shop.hasMany(Product, { foreignKey: 'shop_id' });

Product.belongsTo(Type, { foreignKey: 'type_id' });
Type.hasMany(Product, { foreignKey: 'type_id' });

Product.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });
Product.belongsToMany(Image, { through: ProductGallery, foreignKey: 'product_id', as: 'gallery' });

Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'product_id', as: 'categories' });
Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'category_id', as: 'products' });

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', as: 'tags' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', as: 'products' });

Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children' });

Category.belongsTo(Type, { foreignKey: 'type_id' });
Type.hasMany(Category, { foreignKey: 'type_id' });

Type.belongsTo(Image, { foreignKey: 'image_id', as: 'image' });

module.exports = {
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
};