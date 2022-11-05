import { PAGINATORINFO } from './fragment.paginatorInfo';
import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql `
${ PAGINATORINFO }
query Categories(
  $name: String
  $orderBy: [QueryCategoriesOrderByOrderByClause!]
  $hasType: QueryCategoriesHasTypeWhereHasConditions
  $first: Int
  $page: Int
  $text: String
) {
  categories(
    name: $name
    orderBy: $orderBy
    hasType: $hasType
    first: $first
    page: $page
    text: $text
  ) {
    data {
      id
      type {
        id
        name
        slug
      }
      icon
      name
      slug
      details
      parent {
        id
        name
      }
      children {
        id
        name
        slug
        details
        image {
          id
          thumbnail
          original
        }
        type {
          id
          name
          slug
        }
        # icon
      }
      image {
        id
        thumbnail
        original
      }
      #   products {
      #     id
      #     name
      #   }
    }
    paginatorInfo {
      ...PaginatorParts
    }
  }
}`

export const GET_CATEGORIES_ALONG_CHILDREN = gql `
query CategoriesAlongChildren(
  $orderBy: [QueryCategoriesAlongChildrenOrderByOrderByClause!]
  $hasType: QueryCategoriesAlongChildrenHasTypeWhereHasConditions
) {
  categoriesAlongChildren(orderBy: $orderBy, hasType: $hasType) {
    id
    type {
      id
      name
      slug
    }
    icon
    name
    slug
    details
    parent {
      id
      name
    }
    children {
      id
      name
      slug
      details
      image {
        id
        thumbnail
        original
      }
      type {
        id
        name
        slug
      }
      # icon
    }
    image {
      id
      thumbnail
      original
    }
    # products {
    #   id
    #   name
    # }
  }
}`
export const GET_CATEGORIE = gql `
query Category($id: ID, $slug: String) {
  category(id: $id, slug: $slug) {
    id
    icon
    name
    slug
    details
    parent {
      id
      name
    }
    image {
      id
      thumbnail
      original
    }
    type {
      id
      name
      slug
    }
  }
}`
export const CREATE_CATEGORY = gql `
mutation CreateCategory($input: createCategoryInput) {
  createCategory(input: $input) {
    id
    icon
    name
    slug
    type {
      id
      name
      slug
    }
  }
}`
export const UPDATE_CATEGORY = gql `
mutation UpdateCategory($input: updateCategoryInput) {
  updateCategory(input: $input) {
    id
    icon
    name
    slug
    type {
      id
      name
      slug
    }
  }
}`
export const DELETE_CATEGORY = gql `
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
    icon
    name
    slug
    type {
      id
      name
      slug
    }
  }
}`
