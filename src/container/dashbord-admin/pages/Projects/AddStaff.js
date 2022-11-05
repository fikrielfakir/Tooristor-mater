import React from "react";
import { Loader, Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite';
import { REGISTER } from '../../../../components/GraphQL/auth.graphql';
import { useMutation } from '@apollo/client';
import { useState} from 'react';
import FormInput from "../../components/FromInput"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";


const AddUser = ({Issuccess}) => {

// Input
const inputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Firstame",
    errorMessage:
      "Name should be 3-16 characters !",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "lastname",
    type: "text",
    placeholder: "Lastname",
    errorMessage:
      "lastname should be 3-16 characters",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 3,
    name: "cin",
    type: "text",
    placeholder: "C.I.N",
    errorMessage:
      "CIN should be 6-12 characters !",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 4,
    name: "phone",
    type: "phone",
    placeholder: "Phone",
    errorMessage:
      "Number should be 10 Number",
    pattern: "^[0-9]{8,10}$",
    required: true,
  },
  {
    id: 5,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    required: true,
  },
  {
    id: 6,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  }
];

 
    // BUILD MUTATION FOR LOGIN_USER
    const [register, { loading: LoadingRegister, error: ErrorRegister, data: dataUser }] = useMutation(REGISTER);


    const [values, setvalues] = useState({name:'', lastname:'', email:'', phone:'', cin:'', password:''});
  console.log("next",Issuccess)
    const handleChange = (event) => {
      const { name, value } = event.target;
      setvalues({
        ...values,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event) => 
  {event.preventDefault();
    try {
      const createuser = await register({
          variables: { 
            "input":{
            name: values.name,
            cin: values.cin,
            phone:values.phone,
            lastname:values.lastname,
            email:values.email,
            password:values.password
         }},
        });
        if (!LoadingRegister && !ErrorRegister){
          return createuser
        }
      } catch (e) {
        console.log(e);
    }
}
  return (
          <div className="FormInput">
              {LoadingRegister ? (
                <div>
                  <Placeholder.Paragraph rows={8} />
                  <Loader center content="loading" />
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                <div className="sumbitForm"> {inputs.map((input) => (
                  <FormInput key={input.id} 
                  {...input}
                  value={values[input.name]}
                  onChange={handleChange}
                  />  ))}
                 </div>
                  <div className="validationbutton">
                <button className="sumbit send">Submit</button>
                <button className="sumbit cancel">Cancel</button>
                </div>
              </form>
              )}
            </div>
  );
};

export default AddUser;
