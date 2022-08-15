import { gql } from '@apollo/client';
export const SHOP_PARTS = gql`
fragment ShopParts on Shop {
  id
  name
  slug
  owner_id
  owner {
    name
    email
    profile {
      contact
    }
  }
  staffs {
    name
    email
  }
  description
  logo {
    id
    thumbnail
    original
  }
  cover_image {
    id
    thumbnail
    original
  }
  orders_count
  products_count
  is_active
  balance {
    admin_commission_rate
    total_earnings
    withdrawn_amount
    current_balance
    payment_info {
      account
      name
      bank
      email
    }
  }
  address {
    street_address
    country
    city
    state
    zip
  }
  created_at
}
`;