import React, {useState} from "react";
import { Button, Form } from "semantic-ui-react"
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

function Register(){
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
  }
  const [addUser, {loading}] = useMutation(REGISTER_USER, {
    update(proxy, result){
      console.log(result)
    },
    variables: values
  })
  const onSubmit = (event) => {
    event.preventDefault();
    addUser();

  }


  return (
    <div>
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input label="name"
        placeholder="name.."
        name="name"
        value={values.name}
        onChange={onChange}/>
        <Form.Input label="email"
        placeholder="email.."
        name="email"
        value={values.email}
        onChange={onChange}/>
        <Form.Input label="password"
        placeholder="password.."
        name="name"
        value={values.password}
        onChange={onChange}/>
        <Button type="submit" primary/>
      </Form>
    </div>
  )
}
const REGISTER_USER = gql`
mutation Register(
    $email: String!
    $password: String!
    $name: String!
  ) {
    register(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }`
export default Register