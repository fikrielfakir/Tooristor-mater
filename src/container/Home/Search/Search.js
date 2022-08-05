import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'components/UI/Logo/Logo';
import Container from 'components/UI/Container/Container';
import SearchBox from './SearchBox';
import BannerWrapper, { SearchWrapper } from './Search.style';

const SearchArea = ({ searchTitleStyle, searchDescriptionStyle }) => {
  return (
    <BannerWrapper>
      <Container>
        <SearchWrapper>
        <div className="Head_Logo">
           <Logo
                  withLink
                  linkTo="/"
                  src="/images/logo-alt.svg"
                  title="Tooristor."
                /></div>
          <SearchBox />
        </SearchWrapper>
      </Container>
    </BannerWrapper>
  );
};

SearchArea.propTypes = {
  searchTitleStyle: PropTypes.object,
  searchDescriptionStyle: PropTypes.object,
};

export default SearchArea;