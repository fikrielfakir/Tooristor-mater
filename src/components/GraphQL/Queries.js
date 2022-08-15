import { gql } from "@apollo/client";
import { PAGINATORINFO } from './fragment.paginatorInfo';
export const GET_PRODUCTS = gql`
 ${PAGINATORINFO}
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
      categories {
        id
        name
        children {
          name
          id
          parent {
            id
            name
            children {
              id
              name
            }
          }
        }
      }
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
        id
        name
      }
      price
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
`;

export const GET_PRODUCT_DETAILS = gql`
query product($id_product: ID!) {
 product(id: $id_product) {
   id
   slug
   name
   price
   description
   categories {
        id
        name
      }
   gallery {
        id
        original
        thumbnail
      }
 }
}
`;
export const GET_SHOPS = gql`
query Shops($text: String, $isActive: Boolean, $orderBy: String, $sortedBy: String, $page: Int, $first: Int) {
  shops(text: $text, is_active: $isActive, orderBy: $orderBy, sortedBy: $sortedBy, page: $page, first: $first) {
    paginatorInfo {
      count
      currentPage
      firstItem
      hasMorePages
      lastItem
      lastPage
      perPage
      total
    }
    data {
      id
      owner_id
      owner {
        id
        name
        email
      }
      staffs {
        id
        name
        email
      }
      is_active
      name
      address {
        city
        state
        country
        street_address
        zip
      }
      status
    }
  }
}
`;
export const GET_CATEGORIES = gql`
query Categories($orderBy: [QueryCategoriesOrderByOrderByClause!], $name: String, $text: String, $parent: Int, $hasType: QueryCategoriesHasTypeWhereHasConditions, $first: Int, $page: Int) {
  categories(orderBy: $orderBy, name: $name, text: $text, parent: $parent, hasType: $hasType, first: $first, page: $page) {
    paginatorInfo {
      count
      currentPage
      firstItem
      hasMorePages
      lastItem
      lastPage
      perPage
      total
    }
    data {
      id
      name
      slug
      parent {
        id
        name
      }
      children {
        id
        name
      }
      details
      icon
      type {
        id
        name
      }
      products {
        id
        name
      }
      created_at
      updated_at
    }
  }
}
`;
export const GET_TYPES = gql`
query Types($text: String, $orderBy: [QueryTypesOrderByOrderByClause!]) {
  types(text: $text, orderBy: $orderBy) {
    id
    name
    slug
    icon
    created_at
    updated_at
  }
}
`;