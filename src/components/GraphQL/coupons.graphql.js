import { PAGINATORINFO } from './fragment.paginatorInfo';
import { gql } from '@apollo/client';

export const GET_COUPONS = gql `
${ PAGINATORINFO }
query Coupons(
  $first: Int!
  $page: Int
  $orderBy: [QueryCouponsOrderByOrderByClause!]
  $text: String
) {
  coupons(first: $first, page: $page, orderBy: $orderBy, text: $text) {
    data {
      id
      description
      code
      products{
        id
        name
      }
      shop{
        id
        name
      }
      product_id
      shop_id
      image {
        id
        original
        thumbnail
      }
      type
      amount
      expire_at
      active_from
    }
    paginatorInfo {
      ...PaginatorParts
    }
  }
}`

export const GET_COUPON = gql `
query Coupon($id_coupon: ID, $code: String) {
  coupon(id: $id_coupon, code: $code) {
    id
    description
    code
    image {
      id
      original
      thumbnail
    }
    type
    amount
    expire_at
    active_from
  }
}
`
export const CREATE_COUPON = gql `
mutation CreateCoupon($input: CouponInput) {
  createCoupon(input: $input) {
    id
    description
    code
    product_id
    shop_id
    shop {
        id
        name
      }
      products {
        id
        name
      }
    image {
      id
      original
      thumbnail
    }
    amount
    expire_at
    active_from
  }
}
`
export const UPDATE_COUPON = gql `
mutation UpdateCoupon($id: ID!, $input: CouponUpdateInput) {
  updateCoupon(id: $id, input: $input) {
    id
    description
    code
    image {
      id
      original
      thumbnail
    }
    amount
    expire_at
    active_from
  }
}
`
export const DELETE_COUPONS = gql `
mutation DeleteCoupon($id: ID!) {
  deleteCoupon(id: $id) {
    id
    description
    code
    image {
      id
      original
      thumbnail
    }
    amount
    expire_at
    active_from
  }
}`
