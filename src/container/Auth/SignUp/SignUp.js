import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import { LOGIN_PAGE } from 'settings/constantClient';
import SignUpForm from './SignUpForm';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text
} from '../Auth.style';

const SignUp = () => {
  return (
    <div className="ant-layout-content">
      <div className="logoWrapper">
      <Logo
          withLink
          linkTo="/"
          src="/images/logo-alt-b.svg"
          title="Tooristor."
        />
      </div>
      <div className="FormWrapper">
        <Title>Request an project account</Title>
        <TitleInfo>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc 
           vulputate libero et velit interdum, ac aliquet odio mattis</TitleInfo>
        <SignUpForm />
        <Text>
          Already Have an Account! &nbsp;
          <Link to={LOGIN_PAGE}>Login</Link>
        </Text>
      </div>
    </div>
  );
};

export default SignUp;
