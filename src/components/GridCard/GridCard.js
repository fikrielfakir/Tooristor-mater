import React from 'react';
import PropTypes from 'prop-types';
import GridCardWrapper, {
  ImageWrapper,
  ContentWrapper,
  LocationArea,
  TitleArea,
  CatArea,
  DescriptionArea,
  ProjetArea,
  MetaWrapper,
  ButtonGroup,
} from './GridCard.style';

const GridCard = ({
  className,
  location,
  title,
  cat,
  projet,
  status,
  content,
  editBtn,
  viewDetailsBtn,
  children,
}) => {
  let classes = viewDetailsBtn || editBtn ? `has_btn ${className}` : className;
  return (
    <GridCardWrapper className={`grid_card ${classes}`.trim()}>
      <ImageWrapper className="media_wrapper">{children}</ImageWrapper>
      <ContentWrapper className="content_wrapper">
        {location && <LocationArea>{location}</LocationArea>}
        {title && <TitleArea>{title}</TitleArea>}
        {cat && <CatArea>{cat}</CatArea>}
        <MetaWrapper className="meta_wrapper">
          {content && <DescriptionArea className="price">{content}</DescriptionArea>}
          {projet && <ProjetArea className={status}>{projet}</ProjetArea>}
          {viewDetailsBtn || editBtn ? (
            <ButtonGroup className="button_group">
              {viewDetailsBtn}
              {editBtn}
            </ButtonGroup>
          ) : null}
        </MetaWrapper>
      </ContentWrapper>
    </GridCardWrapper>
  );
};

GridCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cat: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  price: PropTypes.string,
  projet: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  editBtn: PropTypes.element,
  viewDetailsBtn: PropTypes.element,
};

export default GridCard;
