import { gql } from "@apollo/client";
export const GET_PRODUCTS = gql`
  query{
  products{
    data{
      id
      name
      description
      slug
      price 
      categories{
        id
        name
      }
      image{
        id
        original
      }
     
      shop {
        id
        name
        status
      }
    }
  }
}
`;

export const GET_PRODUCT_DETAILS = gql`
query product($id_product: ID!) {
 product(id: $id_product) {
   id
   slug
   name
   price
   description
   categories {
        id
        name
      }
   gallery {
        id
        original
        thumbnail
      }
 }
}
`;