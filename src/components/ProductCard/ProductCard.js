import React from 'react';
import ProjetStatus from 'components/UI/ProjetStatus/ProjetStatus';
import TextLink from 'components/UI/TextLink/TextLink';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import Carousel from 'react-multi-carousel';
import IM1 from "./IM.png"
import 'react-multi-carousel/lib/styles.css';
import GridCard from '../GridCard/GridCard';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PostGrid = ({
  title,
  rating,
  cat,
  content,
  projet,
  status,
  ratingCount,
  gallery,
  slug,
  link,
}) => {
  return (
    <GridCard
      isCarousel={true}
      favorite={
        <Favourite
          onClick={event => {
            console.log(event);
          }}
        />
      }
      title={<TextLink link={`${link}/${slug}`} content={title} />}
      cat={`${cat}`}
      content={`${content}`}
      rating={<Rating rating={rating} ratingCount={ratingCount} type="bulk" />}
      projet={ <ProjetStatus  className={status} content={projet}/>}
      viewDetailsBtn={
        <TextLink
          link={`${link}/${slug}`}
          content="See product"
        />
      }
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        renderDotsOutside={false}
        responsive={responsive}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
      >
        {gallery.map(({ url, title }, index) => (
          <img
            src={IM1}
            alt={title}
            key={index}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
            }}
          />
        ))}
      </Carousel>
    </GridCard>
  );
};

export default PostGrid;
