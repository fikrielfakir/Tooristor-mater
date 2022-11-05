import { gql } from '@apollo/client';

export const UPDATE_USER = gql `
mutation UpdateUser($input: UserUpdateInput) {
  updateUser(input: $input) {
    id
    name
    lastname
    cin
    email
    phone
    profile {
      avatar {
        id
        thumbnail
        original
      }
      contact
      bio
      socials {
        type
        link
      }
    }
    address {
      title
      default
      type
      address {
        street_address
        country
        city
        state
        zip
      }
    }
  }
}
`
