import React, { useEffect, useState } from "react";
import Card from "../components/UI DASHBORD/Card";
import ListMessages from "../components/ListMessages";
import ListProducts from "../components/ListProducts";
import ItemView from "../components/UI DASHBORD/ItemView"
import Placeholder from "../components/UI DASHBORD/ItemView/placeholder"
import { useQuery } from '@apollo/client';
import { GET_SHOPS } from './../../../components/GraphQL/shops.graphql';
import { GET_PRODUCTS } from 'components/GraphQL/products.graphql';
import {ADMIN_DASHBORAD}  from 'components/GraphQL/admin-dashboard-query.graphql';
import { collection, getDocs, addDoc, collectionGroup } from 'firebase/firestore';
import { db } from './../../../library/init-firebase';
import { useTranslation } from 'react-i18next';

const Overview = () => {
    const {t} = useTranslation();
    const [message, setmessage] = useState([]);
    const [visits, setVisit] = useState([]);
    // methode state
    const { loading: LoadingView, error: ErrorView, data: DataViews } = useQuery(ADMIN_DASHBORAD, { pollInterval: 1000 });
    const { loading: shopsLoading, error: shopsError, data: shopsData } = useQuery(GET_SHOPS, { pollInterval: 1000 });
    const { data: productdata, loading: ProductLoading, error: producterro } = useQuery(GET_PRODUCTS, {
        variables: { first: 4 }
    });
    // methode logic 
    if (ErrorView) return `Error! ${ErrorView.message}`;
    if (shopsError) return `Error! ${shopsError.message}`;
    if (producterro) return `Error! ${producterro.message}`;
    const item = [1, 2, 3, 4];

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
      useEffect(() => {
        getVisits()
      }, [])
      useEffect(() => {
        console.log(visits)
      }, [visits])
    
 
    const getMessage = () => {
        const visitsCollectionRef = collection(db, 'contact')
        getDocs(visitsCollectionRef)
          .then(response => {
            const msg = response.docs.map(doc => ({
              data: doc.data(),
              id: doc.id,
    
            }))
            setmessage(msg)
          })
          .catch(error => console.log(error.message))
      }
      useEffect(() => {
        getMessage()
      }, [])
      useEffect(() => {
        console.log(visits)
      }, [message])
    
      const ListProduct = visits.map(e => {
        return (e.data.count);
      });
console.log("visitor", ListProduct.length)
    return (
        <div className="contentOverview">
            <div className="toolbar">
                <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
                    <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">{t("overview")}</div></div>
                    {/* <div className="d-flex align-items-center flex-nowrap text-nowrap py-1">Dashboard Overview</div> */}
                </div>
            </div>
            <div className="view-static">
                <div className="listCard">
                    <Card
                        color="green"
                        icon="icon-Vector-19"
                        view={ListProduct.length}
                    name={t("Visitors")}
                    />
                    <Card
                        color="bleue"
                        icon="icon-Vector-20"
                        view={message.length}
                        name={t("Calls")}
                    />
                    <Card
                        color="violet"
                        icon="icon-Vector-21"
                        view={DataViews?.analytics.totalShops}
                        name={t("shops")}
                    />
                    <Card
                        color="red"
                        icon="icon-Vector-22"
                        view="233"
                        name={t("Visitors")}
                    />
                </div>
            </div>
            <div className="ContentView">
                <div className="FeedList">
                    <div className="ListItem">
                        <div className='TitleList'>{t("shops")}</div>
                        {shopsLoading ||LoadingView ? (
                        
                        <>{item.map((shop, index) => {
                            return (
                                <ItemView loading="loading"/>);
                        })}
                        </>) : (
                            <>{shopsData.shops.data.map((shop, index) => {
                                return (
                                    <ItemView img={shop?.logo.original}
                                        title={shop.name}
                                    />);
                            })}
                            </>
                        )}
                    </div>
                </div>
                <div className="FeedList">
                    <div className="ListItem">
                    <div className='TitleList'>{t("products")}</div>
                        {ProductLoading ? (
                              <>{item.map((shop, index) => {
                                return (
                                    <ItemView loading="loading"/>);
                            })}
                            </>
                        ) : (
                            <>
                                {productdata.products.data.map((product, index) => {
                                    return (
                                        <ItemView img={product?.image.original}
                                            title={product.name}
                                        />);
                                })}</>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
