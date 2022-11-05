import { PAGINATORINFO } from './fragment.paginatorInfo';
import { gql } from '@apollo/client';
import { SHOP_PARTS } from './fragment.shopparts';


export const GET_SHOPS = gql `
 ${PAGINATORINFO}
 ${ SHOP_PARTS }
query Shops(
  $text: String
  $orderBy: String
  $sortedBy: String
  $first: Int = 15
  $page: Int
  $is_active: Boolean
) {
  shops(
    first: $first
    page: $page
    text: $text
    orderBy: $orderBy
    is_active: $is_active
    sortedBy: $sortedBy
  ) {
    data {
      ...ShopParts
    }
    paginatorInfo {
      ...PaginatorParts
    }
  }
}
`;
export const GET_SHOP = gql `
 ${ SHOP_PARTS }
query Shop($id_shop: ID, $slug: String) {
  shop(id: $id_shop, slug: $slug) {
    ...ShopParts
    settings {
      socials {
        icon
        url
      }
      website
      contact
      location {
        lat
        lng
        formattedAddress
        city
        state
        country
        zip
      }
    }
  }
}
`;
export const EDIT_SHOPS = gql `
query EditShop($id: ID, $slug: String) {
  shop(id: $id, slug: $slug) {
    id
    name
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
    created_at
    balance {
      id
      admin_commission_rate
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
    settings {
      socials {
        icon
        url
      }
      website
      contact
      location {
        lat
        lng
        formattedAddress
        city
        state
        country
        zip
      }
    }
  }
}
`;
export const MY_SHOPS = gql `
query MyShops {
  me {
    managed_shop {
      id
      slug
      name
      is_active
      description
      logo {
        thumbnail
      }
    }
    shops {
      id
      slug
      is_active
      name
      description
      logo {
        thumbnail
      }
    }
  }
}
`;
export const GET_STAFFS = gql `
 ${PAGINATORINFO}
query Staffs(
  $shop_id: Int!
  $orderBy: String
  $sortedBy: String
  $first: Int = 15
  $page: Int
) {
  staffs(
    shop_id: $shop_id
    orderBy: $orderBy
    sortedBy: $sortedBy
    first: $first
    page: $page
  ) {
    data {
      id
      name
      email
      is_active
    }
    paginatorInfo {
      ...PaginatorParts
    }
  }
}
`;
export const CREATE_SHOP = gql `
mutation CreateShop($input: ShopInput!) {
  createShop(input: $input) {
    id
    owner_id
    staffs {
      id
      name
      lastname
      cin
      email
      phone
      shops {
        id
      }
    }
    name
    slug
    status
    description
    cover_image {
      id
      thumbnail
      original
    }
    logo {
      id
      original
      thumbnail
    }
    address {
      street_address
      city
      state
      zip
    }
    settings {
      website
      location {
        lat
        lng
        city
        state
        country
        zip
        formattedAddress
      }
      contact
      socials {
        url
        icon
      }
    }
    workhours {
      monday {
        From
        To
      }
      tuesday {
        From
        To
      }
      wednesday {
        From
        To
      }
      thursday {
        From
        To
      }
      friday {
        From
        To
      }
      saturday {
        From
        To
      }
      sunday {
        From
        To
      }
    }
  }
}
`;
export const UPDATE_SHOP = gql `
mutation UpdateShop($id: ID!, $input: ShopInput!) {
  updateShop(id: $id, input: $input) {
    id
    owner_id
  }
}`;
export const DELETE_SHOP = gql `
mutation DeleteShop($id: ID!) {
  deleteShop(id: $id) {
    id
    owner_id
  }
}
`;
export const ADD_STAF = gql `
mutation AddStaff($input: AddStaffInput) {
  addStaff(input: $input)
}
`;
export const REMOVE_STAF = gql `
mutation RemoveStaff($id: ID!) {
  removeStaff(id: $id) {
    id
    name
    email
    is_active
  }
}`
;
export const APPROVE_SHOP = gql `
 ${ SHOP_PARTS }
mutation ApproveShop($input: ApproveShopInput) {
  approveShop(input: $input) {
    ...ShopParts
  }
}`;
export const DISPROVE_SHOP = gql `
 ${ SHOP_PARTS }
mutation DisApproveShop($disApproveShopId: ID!) {
  disApproveShop(id: $disApproveShopId) {
    ...ShopParts
  }
}`;
