import { PAGINATORINFO } from './fragment.paginatorInfo';
import { gql } from '@apollo/client';


export const GET_PRODUCTS = gql `
${ PAGINATORINFO }
query Products(
  $orderBy: [QueryProductsOrderByOrderByClause!]
  $text: String
  $status: String
  $shop_id: Int
  $hasType: QueryProductsHasTypeWhereHasConditions
  $hasCategories: QueryProductsHasCategoriesWhereHasConditions
  $first: Int
  $page: Int
) {
  products(
    orderBy: $orderBy
    text: $text
    status: $status
    hasType: $hasType
    hasCategories: $hasCategories
    first: $first
    page: $page
    shop_id: $shop_id
  ) {
    data {
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
      type {
        id
        name
      }
      shop {
        name
      }
      price
      categories {
        id
        name}
      min_price
      max_price
      quantity
      product_type
      unit
      gallery {
        id
        thumbnail
        original
      }
      status
    }
    paginatorInfo {
      ...PaginatorParts
    }
  }
}
`
export const GET_PRODUCT = gql `
query Product($id_product: ID, $slug: String) {
  product(id: $id_product, slug: $slug) {
    id
    sku
    shop_id
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
    tags {
      id
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
  # attributes {
  #   id
  #   name
  #   slug
  #   values {
  #     id
  #     value
  #   }
  # }
}
`
export const CREATE_PRODUCT = gql `
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
    shop_id
    shop {
      id
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
export const DELETE_PRODUCT = gql `
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