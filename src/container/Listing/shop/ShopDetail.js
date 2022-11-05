import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import Carousel from 'react-bootstrap/Carousel';
import Card from './../Products/card';
import "./item.css"
import { GET_SHOP } from './../../../components/GraphQL/shops.graphql';
import Map from "./../../../components/UI/Map/Map"
import { GET_PRODUCTS } from "../../../components/GraphQL/products.graphql";
import { GET_COUPONS } from 'components/GraphQL/coupons.graphql';
import Loader from "./../../../components/UI/LOADER"

// product gallery breakpoints
const DogPhoto = (props) => {

  const [position, setPosition] = useState({
    latitude: -7.603869,
    longitude: 33.589886,
  });
  const { id_shop } = props.match.params


  const { loading: loadingShop, error: errorShop, data: dataShop } = useQuery(GET_SHOP, {
    variables: { id_shop },
  });
  const { loading: loadingcoupin, error: errorcoupin, data: datacoupin } = useQuery(GET_COUPONS, {
    variables: { first: 1000 }
  });
  const { loading: Prodductloading, error: errorProduct, data: dataProduct } = useQuery(GET_PRODUCTS, {
    variables: {}
  });

  if (loadingShop || Prodductloading || loadingcoupin) return <Loader/>;
  if (errorShop) return `Error! ${errorShop}`;
  if (errorProduct) return `Error! ${errorProduct}`;
  let listoffre, mix
  if (datacoupin) {
    listoffre = datacoupin.coupons.data.map(e => {
      if (e?.shop_id == dataShop?.shop.id)
        return (e?.image);
    });
  }
  var shopGallery = dataShop.shop.cover_image?.map(e => {
    return (e);
  });
  if (!listoffre) {
    mix = shopGallery
  }
  else {
    mix = [...shopGallery, ...listoffre]
  }
  const filtreArray = mix.filter(element => {
    return element !== undefined;
  });
console.log("Gallery",filtreArray)
console.log("coordonee",dataShop?.shop?.settings?.location.lat)
  return (
    <div className="FullItem">
      <div className="gallery">
        <Carousel variant="dark" interval={2000} autoPlay={true} >
          {filtreArray?.map(e => {
            return (
              <Carousel.Item>

                <img className="item-product" src={e?.original} />

              </Carousel.Item>
            );
          })}

        </Carousel>
      </div>
      <div className="titleItem"><h4 className="title">{dataShop.shop.name}</h4><span className="priceItem">{dataShop.status}</span></div>
      <div className="catItem"><span className="cat"></span><span className="view"></span></div>
      <div className="detailItem"><span className="detail">{dataShop.shop.description}</span></div>
      <div className="ItemRelated"><span className="relatedShop">Our address:</span>
        <div className="local"><div className="cartMap">

          <div className="DescriptionLoacal">

            <div className="cart">
              <Map
                position={[dataShop?.shop?.settings?.location.lat, dataShop?.shop?.settings?.location.lng]}
                img={dataShop.shop.logo.original}
                shopName={dataShop.shop.name}
              />

            </div>

            <div className="descriptionLocal"></div>
          </div>
        </div>
        </div>
      </div>
      <div className="ItemRelated"><span className="relatedShop">Our products:</span>
        <div className="reltedlist">
          {dataProduct.products.data.map((e, index) => {
            if (e?.shop.id === dataShop.shop.id)
              return (
                <Card
             
                check="product"
                Workhours={e?.shop}
                  id={e?.id}
                  img={e?.image.original}
                  name={e?.name}
                  target="_blank"
                  cat={e?.categories.id}
                  type="product"
                  desc={e?.description}
                  unit="DH"
                  prix={e?.price}
                  Slug={e?.slug}
                  shops={e?.shop.name}
                  stat={e?.shop.status}
                />
              );
          })}
        </div>
      </div>

    </div>
  );
}
export default DogPhoto