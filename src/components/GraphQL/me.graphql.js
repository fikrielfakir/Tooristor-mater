
import { gql } from '@apollo/client';

export const ME = gql `
query Me {
  me {
    id
    name
    lastname
    cin
    phone
    email
    is_active
    shops {
      id
      products_count
    }
    profile {
      id
      bio
      contact
      avatar {
        thumbnail
        original
        id
      }
    }
    address {
      address {
        city
        zip
        state
        country
        street_address
      }
    }
  }
}
`
