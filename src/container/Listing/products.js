import { useQuery } from "@apollo/client";
import { RESTAURANTS_SEARCH_QUERY } from "../Queries/RestaurantQuery";
import {GET_PRODUCTS} from '../../components/GraphQL/products.graphql'

export const allproducts = ({variables}) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: variables,
  });

  return { loading, error, data };
};
