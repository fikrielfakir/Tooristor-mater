import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegCalendar, FaUserFriends } from 'react-icons/fa';
import { Button } from 'antd';
import DateRangePickerBox from 'components/UI/DatePicker/ReactDates';
import AutoComplete from 'components/Map/AutoComplete';

import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import Data from "./Produit.json"
import { setStateToUrl } from 'library/helpers/url_handler';
import { LISTING_POSTS_PAGE } from 'settings/constantClient';
import {
  FormWrapper,
  ComponentWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Search.style';

const calendarItem = {
  separator: '-',
  format: 'MM-DD-YYYY',
  locale: 'en',
};

const SearchForm = ({ history }) => {
  const [searchDate, setSearchDate] = useState({
    setStartDate: null,
    setEndDate: null,
  });
  const [products, setProducts] = useState('');
  const goToSearchPage = () => {
    const query = {products};
    const search = setStateToUrl(query);
    history.push({
      pathname: LISTING_POSTS_PAGE,
      search: search,
    });
  };

  return (
    <FormWrapper>
      <ComponentWrapper>
        <FaMapMarkerAlt className="map-marker" />
        <input value={products}   name="products" onChange={e => setProducts(e.target.value)} />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaRegCalendar className="calendar" />
        <DateRangePickerBox
          item={calendarItem}
          startDateId="startDateId-id-home"
          endDateId="endDateId-id-home"
          updateSearchData={(setDateValue) => setSearchDate(setDateValue)}
          showClearDates={true}
          small={true}
          numberOfMonths={1}
        />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaUserFriends className="user-friends" />
        <ViewWithPopup
          key={200}
          noView={true}
          className="room_guest"
          view={
            <Button type="default">

            </Button>
          }
          popup={
            <RoomGuestWrapper>
              <ItemWrapper>
                <strong>Room</strong>
                <InputIncDec
                  id="room"
                 
                />
              </ItemWrapper>
              <ItemWrapper>
                <strong>Guest</strong>
                <InputIncDec
                  id="guest"
                 
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          }
        />
      </ComponentWrapper>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        onClick={goToSearchPage}
      >
        Find Hotels
      </Button>
    </FormWrapper>
  );
};

export default withRouter(SearchForm);
