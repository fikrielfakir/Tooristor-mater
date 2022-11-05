import React from 'react';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import NotFoundWrapper, { ContentWrapper } from './404.style';

const BadRequest = ({ staticContext = {} }) => {
  staticContext.status =400;
  return (
    <NotFoundWrapper>
      <ContentWrapper>
        <Image src="/images/400.png" alt="404" />
        <Heading as="h2" content="Something Went Wrong" />
        <TextLink link="/" content="Go Back" />
      </ContentWrapper>
    </NotFoundWrapper>
  );
};

export default BadRequest;
