const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload

  type PaginatorInfo {
    count: Int!
    currentPage: Int!
    firstItem: Int
    hasMorePages: Boolean!
    lastItem: Int
    lastPage: Int!
    perPage: Int!
    total: Int!
  }

  type Image {
    id: ID!
    original: String!
    thumbnail: String!
  }

  type Address {
    street_address: String
    city: String
    state: String
    country: String
    zip: String
  }

  type Location {
    lat: Float
    lng: Float
    formattedAddress: String
    city: String
    state: String
    country: String
    zip: String
  }

  type WorkHours {
    From: String
    To: String
  }

  type WorkHoursSchedule {
    monday: WorkHours
    tuesday: WorkHours
    wednesday: WorkHours
    thursday: WorkHours
    friday: WorkHours
    saturday: WorkHours
    sunday: WorkHours
  }

  type Social {
    icon: String
    url: String
  }

  type ShopSettings {
    socials: [Social]
    website: String
    contact: String
    location: Location
  }

  type PaymentInfo {
    account: String
    name: String
    bank: String
    email: String
  }

  type Balance {
    id: ID!
    admin_commission_rate: Float
    payment_info: PaymentInfo
  }

  type User {
    id: ID!
    name: String!
    email: String!
    is_active: Boolean!
    profile: Profile
    created_at: String!
    managed_shop: Shop
    shops: [Shop]
  }

  type Profile {
    id: ID!
    avatar: Image
    bio: String
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    parent: Category
    children: [Category]
    details: String
    icon: String
    type: Type
    products: [Product]
    created_at: String!
    updated_at: String!
  }

  type Type {
    id: ID!
    name: String!
    slug: String!
    icon: String
    image: Image
    created_at: String!
    updated_at: String!
  }

  type Tag {
    id: ID!
    name: String!
    slug: String!
  }

  type Attribute {
    id: ID!
    name: String!
    slug: String!
    values: [AttributeValue]
  }

  type AttributeValue {
    id: ID!
    value: String!
  }

  type Variation {
    id: ID!
    value: String!
    attribute: Attribute!
  }

  type VariationOption {
    id: ID!
    sku: String
    title: String
    price: Float
    quantity: Int
    is_disable: Boolean
    sale_price: Float
    options: [VariationOptionValue]
  }

  type VariationOptionValue {
    name: String!
    value: String!
  }

  type Shop {
    id: ID!
    owner_id: ID!
    owner: User
    staffs: [User]
    is_active: Boolean!
    name: String!
    slug: String!
    description: String
    logo: Image
    cover_image: Image
    address: Address
    settings: ShopSettings
    workhours: WorkHoursSchedule
    status: String
    balance: Balance
    created_at: String!
    updated_at: String!
  }

  type Product {
    id: ID!
    sku: String
    slug: String!
    name: String!
    description: String
    shop_id: ID
    shop: Shop
    categories: [Category]
    tags: [Tag]
    type: Type
    image: Image
    gallery: [Image]
    price: Float
    min_price: Float
    max_price: Float
    sale_price: Float
    quantity: Int
    in_stock: Boolean
    unit: String
    height: String
    width: String
    length: String
    city: String
    product_type: String
    status: String
    variations: [Variation]
    variation_options: [VariationOption]
    orders: [Order]
    created_at: String!
    updated_at: String!
  }

  type OrderStatus {
    id: ID!
    name: String!
    serial: Int!
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
  }

  type Order {
    id: ID!
    tracking_number: String!
    customer: Customer!
    status: OrderStatus!
    amount: Float!
    sales_tax: Float
    total: Float!
    paid_total: Float
    payment_id: String
    payment_gateway: String
  }

  type AuthPayload {
    token: String!
    permissions: [String]
  }

  type MessageResponse {
    message: String!
    success: Boolean!
  }

  # Paginated Types
  type ProductConnection {
    data: [Product]!
    paginatorInfo: PaginatorInfo!
  }

  type ShopConnection {
    data: [Shop]!
    paginatorInfo: PaginatorInfo!
  }

  type CategoryConnection {
    data: [Category]!
    paginatorInfo: PaginatorInfo!
  }

  type UserConnection {
    data: [User]!
    paginatorInfo: PaginatorInfo!
  }

  # Input Types
  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input CreateProductInput {
    name: String!
    description: String
    shop_id: ID!
    categories: [ID]
    type_id: ID
    price: Float
    quantity: Int
    status: String
    sku: String
    unit: String
    gallery: [Upload]
    image: Upload
  }

  input UpdateProductInput {
    id: ID!
    name: String
    description: String
    categories: [ID]
    type_id: ID
    price: Float
    quantity: Int
    status: String
    sku: String
    unit: String
  }

  input ShopInput {
    name: String!
    description: String
    address: AddressInput
    settings: ShopSettingsInput
    logo: Upload
    cover_image: Upload
  }

  input AddressInput {
    street_address: String
    city: String
    state: String
    country: String
    zip: String
  }

  input ShopSettingsInput {
    website: String
    contact: String
    location: LocationInput
    socials: [SocialInput]
  }

  input LocationInput {
    lat: Float
    lng: Float
    formattedAddress: String
    city: String
    state: String
    country: String
    zip: String
  }

  input SocialInput {
    icon: String
    url: String
  }

  input CreateTypeInput {
    name: String!
    slug: String
    icon: String
    image: Upload
  }

  input createCategoryInput {
    name: String!
    parent: ID
    type_id: ID
    icon: String
    details: String
  }

  input changePasswordInput {
    oldPassword: String!
    newPassword: String!
  }

  input forgetPasswordInput {
    email: String!
  }

  input verifyForgetPasswordTokenInput {
    token: String!
    email: String!
  }

  input resetPasswordInput {
    token: String!
    email: String!
    password: String!
  }

  input ApproveShopInput {
    id: ID!
    admin_commission_rate: Float
  }

  input AddStaffInput {
    email: String!
    shop_id: ID!
  }

  # Order By Enums
  input QueryProductsOrderByOrderByClause {
    column: String!
    order: String!
  }

  input QueryProductsHasTypeWhereHasConditions {
    column: String!
    operator: String!
    value: String!
  }

  input QueryProductsHasCategoriesWhereHasConditions {
    column: String!
    operator: String!
    value: String!
  }

  input QueryCategoriesOrderByOrderByClause {
    column: String!
    order: String!
  }

  input QueryCategoriesHasTypeWhereHasConditions {
    column: String!
    operator: String!
    value: String!
  }

  input QueryTypesOrderByOrderByClause {
    column: String!
    order: String!
  }

  type Query {
    # Product Queries
    products(
      orderBy: [QueryProductsOrderByOrderByClause!]
      text: String
      status: String
      shop_id: Int
      hasType: QueryProductsHasTypeWhereHasConditions
      hasCategories: QueryProductsHasCategoriesWhereHasConditions
      first: Int
      page: Int
    ): ProductConnection!

    product(id: ID, slug: String): Product

    # Shop Queries
    shops(
      text: String
      is_active: Boolean
      orderBy: String
      sortedBy: String
      first: Int
      page: Int
    ): ShopConnection!

    shop(id: ID, slug: String): Shop

    # Category Queries
    categories(
      orderBy: [QueryCategoriesOrderByOrderByClause!]
      name: String
      text: String
      parent: Int
      hasType: QueryCategoriesHasTypeWhereHasConditions
      first: Int
      page: Int
    ): CategoryConnection!

    # Type Queries
    types(
      text: String
      orderBy: [QueryTypesOrderByOrderByClause!]
    ): [Type!]!

    # User Queries
    me: User
    staffs(
      shop_id: Int!
      orderBy: String
      sortedBy: String
      first: Int
      page: Int
    ): UserConnection!
  }

  type Mutation {
    # Authentication
    login(input: LoginInput!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!
    logout: String!
    changePassword(input: changePasswordInput!): MessageResponse!
    forgetPassword(input: forgetPasswordInput!): MessageResponse!
    verifyForgetPasswordToken(input: verifyForgetPasswordTokenInput!): MessageResponse!
    resetPassword(input: resetPasswordInput!): MessageResponse!

    # User Management
    banUser(id: ID!): User!
    activeUser(id: ID!): User!

    # Product Mutations
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Product!

    # Shop Mutations
    createShop(input: ShopInput!): Shop!
    updateShop(id: ID!, input: ShopInput!): Shop!
    deleteShop(id: ID!): Shop!
    approveShop(input: ApproveShopInput!): Shop!
    disApproveShop(id: ID!): Shop!

    # Staff Management
    addStaff(input: AddStaffInput!): String!
    removeStaff(id: ID!): User!

    # Type Mutations
    createType(input: CreateTypeInput!): Type!
    updateType(id: ID!, input: CreateTypeInput!): Type!
    deleteType(id: ID!): Type!

    # Category Mutations
    createCategory(input: createCategoryInput!): Category!
  }
`;

module.exports = typeDefs;