import { useMutation } from '@apollo/client';
import React from 'react';
import { LOGIN_USER } from '../../../components/GraphQL/Mutations';
import Auth from '../utils/auth.js';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const history = useHistory()

  const permission = localStorage.getItem('permissions')

  useEffect(() => {
    if (permission === "customer,store_owner") {
      history.push(`/admin-owner`);
    }
    else if (permission === "super_admin,customer,store_owner") {
      history.push(`/admin`);
    }
  }, [permission])


  // BUILD MUTATION FOR LOGIN_USER
  const [login, { loading }] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userMutationResponse = await login({
        variables: { "input": { email: userFormData.email, password: userFormData.password } },
      });
      const token = userMutationResponse.data.login.token;
      const permissions = userMutationResponse.data.login.permissions;
      Auth.login(token, permissions);
      permission;

    } catch (e) {
      console.log(e);

    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  return (
    <div className="bodyForm">
      {loading ? (
        <div className="loading">
          
  <div class="loadingio-spinner-spinner-fxblu79ew5g"><div class="ldio-cvywdoy3t2n">
<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div></div>


          <p>Please wait...</p>
        </div>
      ) : (
        <form className='login-form' onSubmit={handleFormSubmit}>
          <div className='login'>
            <div className="inputAuth">
              <input className="inputAuth" placeholder='Email address' name='email' type='email' id='email'
                // onBlur={emailIsValid}
                onChange={handleChange}></input>
              <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.25 20.9167H16.7917C17.3442 20.9167 17.8741 20.6972 18.2648 20.3065C18.6555 19.9158 18.875 19.3859 18.875 18.8334V2.16671C18.875 1.61417 18.6555 1.08427 18.2648 0.693568C17.8741 0.302867 17.3442 0.083374 16.7917 0.083374H2.20833C1.6558 0.083374 1.12589 0.302867 0.735194 0.693568C0.344493 1.08427 0.125 1.61417 0.125 2.16671V18.8334C0.125 19.3859 0.344493 19.9158 0.735194 20.3065C1.12589 20.6972 1.6558 20.9167 2.20833 20.9167H3.25ZM9.5 3.20733C11.2156 3.20733 12.625 4.61462 12.625 6.33233C12.625 8.049 11.2156 9.45837 9.5 9.45837C7.78437 9.45837 6.375 8.049 6.375 6.33233C6.375 4.61462 7.78437 3.20733 9.5 3.20733V3.20733ZM3.25 15.9688C3.25 13.6573 6.06771 11.2813 9.5 11.2813C12.9323 11.2813 15.75 13.6573 15.75 15.9688V16.75H3.25V15.9688Z" fill="#353B48" fill-opacity="0.3" />
              </svg></div>
            <div className="inputAuth">
              <input className="inputAuth" placeholder='Password' name='password' type='password' id='password'
                onChange={handleChange}></input>
              <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 7.33329H17.8333C18.1096 7.33329 18.3746 7.44304 18.5699 7.63839C18.7653 7.83374 18.875 8.09869 18.875 8.37496V20.875C18.875 21.1512 18.7653 21.4162 18.5699 21.6115C18.3746 21.8069 18.1096 21.9166 17.8333 21.9166H1.16667C0.890399 21.9166 0.625447 21.8069 0.430097 21.6115C0.234747 21.4162 0.125 21.1512 0.125 20.875V8.37496C0.125 8.09869 0.234747 7.83374 0.430097 7.63839C0.625447 7.44304 0.890399 7.33329 1.16667 7.33329H3.25V6.29163C3.25 4.63402 3.90848 3.04431 5.08058 1.87221C6.25268 0.700106 7.8424 0.041626 9.5 0.041626C11.1576 0.041626 12.7473 0.700106 13.9194 1.87221C15.0915 3.04431 15.75 4.63402 15.75 6.29163V7.33329ZM13.6667 7.33329V6.29163C13.6667 5.18656 13.2277 4.12675 12.4463 3.34535C11.6649 2.56395 10.6051 2.12496 9.5 2.12496C8.39493 2.12496 7.33512 2.56395 6.55372 3.34535C5.77232 4.12675 5.33333 5.18656 5.33333 6.29163V7.33329H13.6667ZM8.45833 13.5833V15.6666H10.5417V13.5833H8.45833ZM4.29167 13.5833V15.6666H6.375V13.5833H4.29167ZM12.625 13.5833V15.6666H14.7083V13.5833H12.625Z" fill="#353B48" fill-opacity="0.3" />
              </svg></div>
              <div className="inputAuth">
<button className="btnAuth" type='submit' >Login </button>
          </div>
          </div>
          
        </form>)}
    </div>
  )
}

export default LoginForm