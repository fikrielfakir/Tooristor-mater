
import ItemView from '../UI DASHBORD/ItemView'
import React from "react";
import { GET_SHOPS  } from "../../../../components/GraphQL/shops.graphql";
import { useQuery} from "@apollo/client";


const ListShops = props => {
    const { loading, error, data } = useQuery(GET_SHOPS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    
    return (
        <div className="ListItem">
      <div className='TitleList'>{props.Title}</div>
      {data.shops.data?.map(e=>{
       return (
       <ItemView
       title={e?.name}
       IconMore="SED"
       /> 
       );
    })}
       </div>
    )
};

export default ListShops
