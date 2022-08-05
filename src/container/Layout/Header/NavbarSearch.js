import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import SearchBox from '../../Home/Search/SearchBox';
import { setStateToUrl, getStateFromUrl } from 'library/helpers/url_handler';
import { mapDataHelper } from 'components/Map/mapDataHelper';
import { LISTING_POSTS_PAGE } from 'settings/constantClient';
import { NavbarSearchWrapper } from './Header.style';

const NavbarSearch = (props) => {
  const updateValueFunc = (value) => {
    const { searchedPlaceAPIData } = value;
    let tempLocation = [];
    const mapData = !isEmpty(searchedPlaceAPIData)
      ? mapDataHelper(searchedPlaceAPIData)
      : [];
    if (!isEmpty(mapData) && mapData.length !== 0) {
      mapData.forEach((singleMapData) =>
        tempLocation.push({
          lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
          lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
        })
      );
    }
    const searchLocation = tempLocation ? tempLocation[0] : {};
    if (!isEmpty(searchLocation)) {
      const state = getStateFromUrl(props.location);
      const query = {
        ...state,
        location: searchLocation,
      };
      const search = setStateToUrl(query);
      props.history.push({
        pathname: LISTING_POSTS_PAGE,
        search: search,
      });
    }
  };

  return (
    <div className="headNav">
     <SearchBox />
     </div>
  );
};

export default withRouter(NavbarSearch);
