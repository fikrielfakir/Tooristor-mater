import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'components/UI/Logo/Logo';
import { REGISTRATION_PAGE } from 'settings/constantClient';
import SignInForm from './SignInForm';
import Wrapper, {
  Title,
  TitleInfo,
  Text
} from '../Auth.style';

const SignIn = () => {
  return (
      <div className="bodyFrom">
      <div className="logoWrapper">
         <Logo
          withLink
          linkTo="/"
          src="/images/logo-alt-b.svg"
          title="Tooristor."
        />
      </div>
      <div className="FormWrapper">
        <Title>Access to your project</Title>
        <TitleInfo>Please log into your account</TitleInfo>
        <SignInForm />
        <Text>
          <Link to={REGISTRATION_PAGE}>Request an project account</Link>
        </Text>
        </div>
    </div>
  );
};

export default SignIn;
