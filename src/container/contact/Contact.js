import React from 'react';
import ContactForm from './ContactForm.js';
import {
  Title2,
  TitleInfo2,
  Text2,
  Info
} from '../Auth/Auth.style';

const SignUp = () => {
  return (
    <div className="ant-layout-content contact">
    
      <div className="FormWrapper">
        <Title2>Contact us</Title2>
        <TitleInfo2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc 
vulputate libero et velit interdum, ac aliquet odio mattis.</TitleInfo2>
        <ContactForm />
        <Text2>
        Or contact us via
        </Text2>
        <Info><p className="info"><span className="icon-ic24-email"></span>contact@tooristor.ma</p><p className="info"><span className="icon-Vector-17"></span>+212 5 384 3943</p></Info>
      </div>
    </div>
  );
};

export default SignUp;
