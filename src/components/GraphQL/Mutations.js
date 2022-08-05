import { gql } from "@apollo/client";


export const CREATE_PORDUCT = gql `
mutation createProduct($name: String!, $description: String!) {
  createProduct(name: $name, description: $description) {
      id
      name
      description
      categories {
      id
      name
    }
    }
  }
 `
 export const LOGIN_USER = gql`
 mutation login($email: String!, $password: String!) {
 login(email: $email, password: $password) {
     token
     user {
         username
         password
         email
     }
 }
 }
`;
export const CREATE_CATEGORY = gql `
mutation($name: String!) {
  createCategory(name: $name) {
    id
    name
  }
}
 `
