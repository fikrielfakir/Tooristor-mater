import React from 'react';
import ContactForm from './ContactForm.js';
import { useTranslation } from 'react-i18next';

import {

  Title2,
  TitleInfo2,
  Text2,
  Info
} from '../Auth/Auth.style';

const SignUp = () => {
  const {t} = useTranslation();
  return (
    <div className="ant-layout-content contact">
    
      <div className="FormWrapper">
        <Title2>{t("Contact_us")}</Title2>
        <TitleInfo2>{t("Contact_us_detail")}</TitleInfo2>
        <ContactForm />
        <Text2>
       {t("contact_us_via")}
        </Text2>
        <Info><p className="info"><span className="icon-ic24-email"></span>contact@tooristor.ma</p><p className="info"><span className="icon-Vector-17"></span>+212 5 384 3943</p></Info>
      </div>
    </div>
  );
};

export default SignUp;
