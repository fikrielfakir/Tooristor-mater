import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'components/UI/Logo/Logo';
import Container from 'components/UI/Container/Container';
import SearchBox from './SearchBox';
import { useTranslation } from 'react-i18next';
import BannerWrapper, { SearchWrapper } from './Search.style';

const SearchArea = ({ searchTitleStyle, searchDescriptionStyle }) => {

  const { t, i18n } = useTranslation();
  // Other code
  const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };
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
                />
            {/* <p>{t('welcome_message')}</p> */}
          </div>
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