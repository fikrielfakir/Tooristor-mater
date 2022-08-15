import React from 'react';
import FiltreBare from './FiltreBare';
import Card from './Products/card';
import {GET_PRODUCTS} from '../../components/GraphQL/products.graphql'
import { useQuery} from '@apollo/client';
import ListingWrapper from './Listing.style';

export default function Listing({ location, history }) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <ListingWrapper>
       <FiltreBare/>
       <div className="fullFeed">
       <h3 className="Small">Suggestions</h3>
       <span className="micro">Here some suggestions we found</span>
       <div className="list_card">
       {data.products.data?.map(e=>{
       return (
      <Card
      id={e?.id}
      img={e?.image.original}
      name={e?.name}
      cat={e?.categories.id}
      desc={e?.description}
      prix={e?.price}
      Slug={e?.slug}
      shops={e?.shop.name}
      stat={e?.shop.status}
      />
      );
    })}
    </div>
    </div>
    </ListingWrapper>
  );

}
