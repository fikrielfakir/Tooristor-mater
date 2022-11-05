import { gql } from '@apollo/client';

export const UPLOAD_MUTATE = gql `
mutation Upload($attachment: [Upload!]!) {
  upload(attachment: $attachment) {
    original
    thumbnail
    id
  }
}`;
