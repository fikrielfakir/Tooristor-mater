import React, { useEffect, useState } from "react";
import { GET_PRODUCT } from '../../../components/GraphQL/products.graphql';
import { useQuery} from '@apollo/client';
import { collection, getDocs, addDoc,Group,orderBy } from 'firebase/firestore';
import { db } from './../../../library/init-firebase';
import { doc, updateDoc} from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import Card from './../Products/card';
import Loader from "./../../../components/UI/LOADER"
// import { visitsCollectionRef } from './../../../library/firestore.collections'

import Carousel from 'react-bootstrap/Carousel';
import "./item.css"
import BadRequest from './../../400/index';

// product gallery breakpoints
const DogPhoto = (props) => { 
  const { t } = useTranslation();
   const { id_product } = props.match.params
     const [visits, setVisit] = useState([]);
     const cdate = new Date()
     const [count, setCount] = useState(1)
  useEffect(() => {
    // Access count value from session storage
    var pageView = sessionStorage.getItem("pageView");
    if (pageView == null) {
      // Initialize page views count
      pageView = 1;
    } else {
      // Increment count
      pageView = Number(pageView) + 1;
    }
    // Update session storage
    sessionStorage.setItem("pageView", pageView);
    setCount(pageView);
  }, []); //No dependency to trigger in each page load

  function handleSubmit(e) {
     const visitsCollectionRefs = collection(db, 'product')
    addDoc(visitsCollectionRefs, { count,cdate, id_product})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  function handleupdate(e) {
    const docRef = doc (db, 'product', id_product)
    updateDoc(docRef, {count,cdate}).then(response =>{
      console.log(response)
    }).catch(error => console.log(error.message))
  }
  useEffect(() => {
    getVisits()
  }, [])
  useEffect(() => {
    console.log(visits)
  }, [visits])

  const getVisits = () => {
    const visitsCollectionRefs = collection(db, 'product')
    getDocs(visitsCollectionRefs)
      .then(response => {
        const vst = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,

        })) 
        setVisit(vst)
      })
      .catch(error => console.log(error.message))
  }


  const { loading: GET_LOADING, error:errorproduct, data } = useQuery(GET_PRODUCT, {
    variables: { id_product },
  });
   !GET_LOADING && handleSubmit()

  if (GET_LOADING) return <Loader/>;
  if (errorproduct) return <BadRequest/>;

  

  const ListProduct = visits.map(e => {
    return (e.data.count);
  });
    console.log("count",ListProduct)
  return (
    <div className="FullItem">
       <div className="gallery">
      <Carousel variant="dark" interval={2000} autoPlay={true}>
        {data.product.gallery?.map(e => {
          return (
            <Carousel.Item>
              <img className="item-product" src={e.original} />

            </Carousel.Item>
          );
        })}

      </Carousel>
</div>
      {/* <div>
                <h2>{visits.length}</h2>
               
      </div> */}
      <div className="titleItem"><h4 className="title">{data.product.name}<p>{t("Category")} {'>'} {data.product.categories?.map(c => {
    return (c?.name)
  })}</p></h4><span className="priceItem">
    {data.product?.max_price && data.product?.max_price? (<><del className="minsalle">{data.product.min_price} {t("Dh")}</del><>{data.product.max_price} {t("Dh")}</></> ):(data.product.price)
    }
    
    </span></div>
      <div className="catItem"><span className="cat">{data.product.categories.name}</span><span className="view"></span></div>
      <div className="detailItem"><span className="detail">{data.product.description}</span></div>
      <div className="ItemRelated"><span className="relatedShop">{t("Available_in")}</span>
      <div className="reltedlist">
                <Card
                target="_blank"
                Workhours={data?.product?.shop}
                type="shop"
                id={data.product.shop?.id}
                img={data.product.shop?.logo?.original}
                name={data.product.shop?.name}
                desc={data.product.shop?.description}
                // stat={status}
                // shops={status}
              />
        </div>

      </div>

    </div>
  );
}
export default DogPhoto