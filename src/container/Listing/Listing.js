import React, { useState } from "react";
import FiltreBare from './FiltreBare';
import SearchBox from "./../../container/Home/Search/SearchBox"
import Card from './Products/card';
import { GET_PRODUCTS } from '../../components/GraphQL/products.graphql'
import { GET_CATEGORIES } from './../../components/GraphQL/categories.graphql';
import { useQuery } from '@apollo/client';
import ListingWrapper from './Listing.style';
import { useLocation } from "react-router-dom";
import { GET_SHOPS } from '../../components/GraphQL/shops.graphql';
import Loader from "./../../components/UI/LOADER"
import { useTranslation } from 'react-i18next';
import Empty from "./../../components/UI/Empty.js"
import Error from "./../../components/UI/Error.js"

export default function Listing({ location, history }) {
  const { t } = useTranslation();
  const search = useLocation().search;
  const [filtre, setfiltre] = useState({ categories: null, price: null });
  const product = new URLSearchParams(search).get('products');
  const project = new URLSearchParams(search).get('project');
  const getcity = new URLSearchParams(search).get('city');
  console.log("value set",project ,getcity)


  const { data: shopsQuery, loading: suggestionsloading, error: suggestionserror } = useQuery(GET_SHOPS, {
    variables: {
    }
  });


  const onFiltre = (event) => {
    setfiltre(filtre.categories = event)
    // console.log("Category select", filtre.categories)
  }

  let slug = null
  if (filtre.categories) {
    slug = "SLUG"
  }
  const { loading: loadingcategory, error: errorcategory, data: datacategory } = useQuery(GET_CATEGORIES);
  const { data: dataproduct, loading: loaderproduct, error: errorproduct } = useQuery(GET_PRODUCTS, {
    variables: {
      hasType: { column: "SLUG", value: project },
    }});

  const { data: searchResult, loading: loadingproduct, error: producterror } = useQuery(GET_PRODUCTS, {
    variables: {
      text: product,
      hasType: { column: "SLUG", value: project },
      city: getcity,
      // hasCategories: {
      //   HAS: {
      //     condition: {
      //       value: "T-SHIRT",
      //       column: "SLUG"
      //     }
      //   },

      // }
    }
  });


  let ListShop;
  let listcategory
  let listProduct;
  let workshoursID;


  listcategory = datacategory?.categories?.data?.map(c => {
    return (c?.name)
  });

  if (searchResult) {
    listProduct = searchResult.products.data
  }

  // --------------------------------- FILTRE SHOP SERCHABLE --------------------------------
  // workshoursID = listProduct?.map(p => {
  //   return (p?.shop.workhours)
  // });

  // if (shopsQuery) {
  //   ListShop = shopsQuery.shops.data
  // }

  // const workhoursX = workshoursID?.map(e => {
  //   return (e?.[dayName])
  // });

  // // ------------------------------->
  // const TimeFrom = workhoursX?.map(e => {
  //   return (e[0]?.From?.split(":"))
  // });
  // const TimeTo = workhoursX?.map(e => {
  //   return (e[0]?.To?.split(":"))
  // });
  // //<---------------------------------

  // let heurFrom, heurTo, MinuteFrom, MinuteTo;
  // if (searchResult && !producterror && !loadingproduct && shopsQuery) {
  //   heurFrom = TimeFrom
  //   heurTo = TimeTo
  //   MinuteFrom = TimeFrom
  //   MinuteTo = TimeTo
  // }
  // console.log("H:MM", heurFrom, "-", MinuteFrom)
  // console.log("H:MM", heurTo, "-", MinuteTo)

  // if (heurFrom === '0') {
  //   heurFrom = 24
  // }
  // if (heurTo === '0') {
  //   heurTo = 24
  // }
  // let HP_FROM = Number(heurFrom * 60 + MinuteFrom * 1)
  // let HP_TO = Number(heurTo * 60 + MinuteTo * 1)
  // // let Progress = Math.abs(diffHeure + diffMin)
  // // if (heurTo < heurFrom) {
  // //   Progress = 1440 - Progress
  // // }

  // // if (Progress === 0) {
  // //   Progress = 1440
  // // }
  // const currantH = (time[0] * 60)
  // const currantM = Number(time[1])
  // let currantTime = currantH + currantM;

  // if (HP_FROM === 0) {
  //   HP_FROM = 1440
  // }
  // if (HP_TO === 0) {
  //   HP_TO = 1440
  // }
  // // if (HP_TO < HP_FROM){
  // //   HP_TO = 1440 + HP_TO
  // // }
  // // console.log("heur From:", heurFrom, 'Minute From:', MinuteFrom)
  // // console.log("heur To:", heurTo, 'Minute To:', MinuteTo)
  // console.log("HP_FROM", HP_FROM, 'HP_TO', HP_TO)
  // console.log("CurrantH ", currantH, 'CurrantM', currantM, "Total Min", currantTime)


  // const status = currantTime <= HP_TO && currantTime >= HP_FROM ? 'open' : 'close'
  // console.log("status", status)
  if (suggestionsloading) return (<Loader />);
  if (loadingproduct || loaderproduct) return (<Loader />);
  let searchByshpp
  if (producterror || searchResult.products.paginatorInfo.count === 0) {
   
    if (dataproduct && !suggestionserror  ) {
      searchByshpp = dataproduct.products.data?.map(e => {
        return (e?.shop);
      });
    }
  }
  else if (!searchByshpp && !searchResult || searchByshpp?.length === 0){
    return  <Empty />
  }

  const mapproduct = listProduct?.map(e => {
    return (e?.shop);
  });
  let listshop
  if (listProduct) {
    listshop = mapproduct.map(e => {
      return (e);
    });
  }
  const withoutDuplicatesshop = [...new Set(searchByshpp)];
  const withoutDuplicates = [...new Set(listshop)];
  // console.log("dublicate", withoutDuplicates)

  let Onlyshop
  if (product === null && getcity && project) {
    // console.log("All Shop")
    // Onlyshop = ListShop.map(e => {

    // });
  }
  else {
    Onlyshop = withoutDuplicates
  }
  let doubleface 
  if ( searchByshpp) {
    doubleface = withoutDuplicatesshop
  }
  else if (withoutDuplicates && !searchByshpp){
    doubleface = withoutDuplicates
  }
  if (withoutDuplicatesshop?.length === 0 && withoutDuplicates?.length === 0){
    return  <Empty />
  }
  console.log("list shop",withoutDuplicates?.length)
  return (
    <ListingWrapper>
      <div className="ListingOnly Mobile">
        <SearchBox />
        <FiltreBare
          data={listcategory}
          OnChange={onFiltre}
          placeholder={t("Category")}
        />

        <div className="fullFeed">
          <h3 className="Small">{t("suggestions")}</h3>
          <span className="micro">{t("somme_suggestion")}</span>
          <div className="list_card">
            {doubleface?.map((e) => {
              return (
                <Card
                  Workhours={e}
                  check="shop"
                  id={e?.id}
                  img={e?.logo?.original}
                  name={e?.name}
                  // name={e?.address?.city}
                  type="shop"
                  desc={e?.description}
                  shops={status}
                />
              );
            })}
          </div>
          <br />
          {!searchByshpp &&
          <>
          <h3 className="Small B">{t("Did_you_mean")} {product} ?</h3>
          <span className="micro">{t("Here_some_resaults")} {searchResult?.products.paginatorInfo.count} {t("products")}</span>
          </>
          }
          <div className="list_card">
            {searchResult?.products.data?.map(e => {
              if (e?.in_stock === true)
                return (
                  <Card
                    type="product"
                    Workhours={e?.shop}
                    id={e?.id}
                    img={e?.image.original}
                    name={e?.name}

                    cat={e.categories.map(i => {
                      return (i.name)
                    })}
                    desc={e?.description}
                    unit={t("Dh")}
                    prix={e?.price}
                    minprice={e?.min_price}
                    maxprice={e?.max_price}
                    Slug={e?.slug}
                    shops={e?.shop.name}
                  // stat={status}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </ListingWrapper>
  );

}
