import { gql } from '@apollo/client';

export const GET_TYPES = gql`
query Types($text: String, $orderBy: [QueryTypesOrderByOrderByClause!]) {
  types(text: $text, orderBy: $orderBy) {
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
export const GET_TYPE = gql`
query Type($id: ID, $slug: String) {
  type(id: $id, slug: $slug) {
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
export const CREATE_TYPE = gql`
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
export const UPDATE_TYPE = gql`
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
export const DELETE_TYPES = gql`
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