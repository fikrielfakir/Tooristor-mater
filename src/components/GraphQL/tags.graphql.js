import { PAGINATORINFO } from './fragment.paginatorInfo';
import { gql } from '@apollo/client';
import { TAG_PARTS } from './fragment.typePart';

export const GET_TAGS = gql `
 ${PAGINATORINFO}
 ${ TAG_PARTS }
query Tags(
  $orderBy: [QueryTagsOrderByOrderByClause!]
  $name: String
  $text: String
  $hasType: QueryTagsHasTypeWhereHasConditions
  $first: Int = 15
  $page: Int
) {
  tags(
    text: $text
    orderBy: $orderBy
    name: $name
    hasType: $hasType
    first: $first
    page: $page
  ) {
    data {
      ...TagParts
    }
    paginatorInfo {
      ...PaginatorParts
    }
  }
}
`
export const GET_TAG = gql `
 ${PAGINATORINFO}
 ${ TAG_PARTS }
query Tag($id: ID, $slug: String) {
  tag(id: $id, slug: $slug) {
    ...TagParts
  }
}`
export const CREATE_TAG = gql `
mutation CreateTag($input: createTagInput) {
  createTag(input: $input) {
    id
  }
}
`
export const UPDATE_TAGE = gql `
mutation UpdateTag($input: updateTagInput) {
  updateTag(input: $input) {
    ...TagParts
  }
}
`
export const DELETE_TAGE = gql `
mutation DeleteTag($id: ID!) {
  deleteTag(id: $id) {
    ...TagParts
  }
}`
