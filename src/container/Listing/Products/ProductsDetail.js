import React from 'react';
import { GET_PRODUCT_DETAILS } from '../../../components/GraphQL/Queries'
import { useQuery, gql } from '@apollo/client';
import Carousel from 'react-bootstrap/Carousel';
import "./item.css"

// product gallery breakpoints
const DogPhoto = (props) => {

  const { id_product } = props.match.params
  console.log("props", props, " Country Id = ", id_product);

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id_product },
  });

  if (loading) return `Loading`;
  if (error) return `Error! ${error}`;
  return (
    <div className="FullItem">
      <Carousel variant="dark">
        
        {data.product.gallery?.map(e => {
          return (
            <Carousel.Item>
              <img className="item-product" src={e.original} />

            </Carousel.Item>
          );
        })}

      </Carousel>
      <div className="titleItem"><h4 className="title">{data.product.name}</h4><span className="priceItem">{data.product.price} DH</span></div>
      <div className="catItem"><span className="cat">{data.product.categories.name}</span><span className="view"></span></div>
      <div className="detailItem"><span className="detail">{data.product.description}</span></div>
      <div className="ItemRelated"><span className="relatedShop">Available in:
      </span>
      
        </div>

    </div>
  );
}
export default DogPhoto