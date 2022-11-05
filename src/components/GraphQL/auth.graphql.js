import { gql } from '@apollo/client';
export const LOGIN = gql `
mutation Login($email: String!, $password: String!) {
  login(input: { email: $email, password: $password }) {
    token
    permissions
  }
}
`
export const LOGOUT = gql `
mutation Logout {
  logout
}
`
export const REGISTER = gql `
mutation Register($input: RegisterInput) {
  register(input: $input) {
    token
    permissions
  }
}
`
export const BAN_USER = gql `
mutation BanUser($id: ID!) {
  banUser(id: $id) {
    id
    name
    email
    is_active
    profile {
      id
      avatar {
        id
        original
        thumbnail
      }
      bio
    }
    created_at
  }
}
`
export const ACTIVE_USER = gql `
mutation ActiveUser($id: ID!) {
  activeUser(id: $id) {
    id
    id
    name
    email
    is_active
    profile {
      id
      avatar {
        id
        original
        thumbnail
      }
      bio
    }
    created_at
  }
}
`
export const CHANGE_PASSWORD = gql `
mutation ChangePassword($input: changePasswordInput) {
  changePassword(input: $input) {
    message
    success
  }
}
`
export const FORGET_PASSWORD = gql `
mutation ForgetPassword($input: forgetPasswordInput) {
  forgetPassword(input: $input) {
    message
    success
  }
}
`
export const VERIFY_FORGET_PASSWORD = gql `
mutation VerifyForgetPasswordToken($input: verifyForgetPasswordTokenInput) {
  verifyForgetPasswordToken(input: $input) {
    message
    success
  }
}
`
export const RESET_PASSWORD = gql `
mutation ResetPassword($input: resetPasswordInput) {
  resetPassword(input: $input) {
    message
    success
  }
}
`