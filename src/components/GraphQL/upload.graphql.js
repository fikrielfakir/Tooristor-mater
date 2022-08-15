import { gql } from '@apollo/client';

export const UPLOAD = gql `
mutation Upload($attachment: [Upload!]!) {
  upload(attachment: $attachment) {
    original
    thumbnail
    id
  }
}`;
