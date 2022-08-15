import { gql } from "@apollo/client";


export const CREATE_PORDUCT = gql `
mutation CreateProduct($input: CreateProductInput) {
  createProduct(input: $input) {
    id
    sku
    slug
    name
    description
    image {
      id
      thumbnail
      original
    }
    in_stock
    sale_price
    price
    min_price
    max_price
    quantity
    unit
    height
    width
    length
    status
    gallery {
      id
      thumbnail
      original
    }
    categories {
      id
      icon
      name
      slug
    }
    type {
      id
      name
      slug
    }
    product_type
    variations {
      id
      value
      attribute {
        name
        slug
        values {
          id
          value
        }
      }
      # pivot {
      #   price
      # }
    }
    variation_options {
      id
      sku
      title
      price
      quantity
      is_disable
      sale_price
      options {
        name
        value
      }
    } 
  }
}
 `
 export const UPDATE_PRODUCT = gql `
 mutation UpdateProduct($input: UpdateProductInput) {
  updateProduct(input: $input) {
    id
    sku
    slug
    name
    description
    image {
      id
      thumbnail
      original
    }
    in_stock
    sale_price
    price
    min_price
    max_price
    quantity
    unit
    height
    width
    length
    status
    gallery {
      id
      thumbnail
      original
    }
    categories {
      id
      icon
      name
      slug
    }
    type {
      id
      name
      slug
    }
    product_type
    variations {
      id
      value
      attribute {
        name
        slug
        values {
          id
          value
        }
      }
      # pivot {
      #   price
      # }
    }
    variation_options {
      id
      sku
      title
      price
      quantity
      is_disable
      sale_price
      options {
        name
        value
      }
    }
  }
}

 `
 export const DELETE_PRODUCT = gql`
 mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    id
    sku
    slug
    name
    description
    image {
      id
      thumbnail
      original
    }
    in_stock
    sale_price
    price
    quantity
    unit
    gallery {
      id
      thumbnail
      original
    }
    categories {
      id
      icon
      name
      slug
    }
    type {
      id
      name
      slug
    }
    variations {
      id
      value
      attribute {
        name
        slug
      }
      # pivot {
      #   price
      # }
    }
    orders {
      tracking_number
      customer {
        name
      }
      status {
        id
        name
        serial
      }
      amount
      sales_tax
      total
      paid_total
      payment_id
      payment_gateway
    }
  }
}
 `
 export const LOGIN_USER = gql`
 mutation Login($input: LoginInput) {
  login(input: $input) {
    token
    permissions
  }
}
`;
export const CREATE_CATEGORY = gql `
mutation CreateCategory($input: createCategoryInput) {
  createCategory(input: $input) {
    id
    name
    type {
      id
      name
    }
  }
}
 `
 /// TYPE MUTATION -------------------------------------------------------------------
export const CREATE_TYPE = gql `
mutation CreateType($input: CreateTypeInput) {
  createType(input: $input) {
    id
    name
    slug
    icon
    image {
      id
      thumbnail
      original
    }
  }
}
 `
export const UPDATE_TYPE = gql `
mutation UpdateType($id: ID!, $input: CreateTypeInput) {
  updateType(id: $id, input: $input) {
    id
    name
    slug
    icon
    image {
      id
      thumbnail
      original
    }
  }
}
 `
export const DELETE_TYPE = gql `
mutation DeleteType($id: ID!) {
  deleteType(id: $id) {
    id
    name
    slug
    icon
    image {
      id
      thumbnail
      original
    }
  }
}
 `
export const CREATE_SHOP = gql `
mutation CreateShop($input: ShopInput!) {
  createShop(input: $input) {
    id
    owner_id
  }
}
 `
export const UPDATE_SHOP = gql `
mutation UpdateShop($id: ID!, $input: ShopInput!) {
  updateShop(id: $id, input: $input) {
    id
    owner_id
  }
}
 `
export const DELETE_SHOP = gql `
mutation DeleteShop($id: ID!) {
  deleteShop(id: $id) {
    id
    owner_id
  }
}

 `
