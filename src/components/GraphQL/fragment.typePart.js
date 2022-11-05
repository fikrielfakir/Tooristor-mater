import { gql } from '@apollo/client';
export const TAG_PARTS = gql`

fragment TagParts on Tag {
  id
  name
  slug
  details
  image {
    id
    thumbnail
    original
  }
  icon
  products {
        id
        name
      }
  type {
    id
    name
    slug
  }
}
`;