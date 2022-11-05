import React, {useState,useEffect} from 'react';
import { useQuery} from "@apollo/client";
import Project from './project';
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box';
import { withRouter } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import AutoSeggestion from "./AutoComplete";
import { GET_PRODUCTS } from 'components/GraphQL/products.graphql';
import { GET_TYPES } from './../../../components/GraphQL/type.graphql';
import Ville from "./../../../Assets/ville"
import { LISTING_POSTS_PAGE } from '../../../settings/constantClient';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { setStateToUrl } from 'library/helpers/url_handler';
import Loader from "./../../../components/UI/LOADER"
// import { Loader } from 'rsuite';
import ErrorServer from "./../../../components/UI/ErrorServer"
const SearchBox = ({ history }) => {
  
  // Type state
  const [toor, setToor] = useState({
    product: null,
    city: null,
    type_id: null,
  });
  const [product, setproduct] = useState(null);
  const { t } = useTranslation();
  const [city, setCity] = useState(null);
  const [filedA, setfiledA] = useState(false);
  const [filedB, setfiledB] = useState(false);
  const prod = (data) => {
    setproduct(data);
  };
// // log show
//     console.log(`Product log: ${product}`);
//     console.log(`Project log: ${toor.type_id}`);
//     console.log(`City log: ${city}`);
    
  const formUpdate = (event) => {
    setToor({ ...toor, [event.target.name]: event.target.value })
  }
  // Hooks at the top
  const { loading:loadingProduct, error:errorProduct, data:dataProduct } = useQuery(GET_PRODUCTS);
  const { loading:loadingType, error:errorTyep, data:dataType } = useQuery(GET_TYPES);

  // Rendering logic

  if (errorProduct || errorTyep) return <ErrorServer/>;

  // Any methods you might need
  let ListProduct, Filtre;
  if (dataProduct) {
   
    Filtre = dataProduct.products.data.map(e => {
     if (e.in_stock === true)
     return (e.name);
  });
}
const withoutDuplicates = [...new Set(Filtre)];
 ListProduct = withoutDuplicates.filter(element => {
  return element !== undefined;
});

console.log("FIlTTEE",ListProduct )
// methode set parametre
const goToSearchPage = () => {
  const query = {
    products: product,
    project: toor.type_id,
    city:city,
  };
  if (city === null || query.city === null ){

    return (setfiledA(true))
  
  }
  else if (toor.type_id === null || query.project === null ){
    return (setfiledB(true))
  }
  else {
  const search = setStateToUrl(query);
  history.push({
    pathname: LISTING_POSTS_PAGE,
    search: search,
  });
}

};
// let fieled
// if (goToSearchPage.query.city == null){
//   fieled = false
// }


    return (
      <>
      {loadingProduct || loadingType ? (<Loader />):(
        <div className="Searchbox">
        <AutoSeggestion suggestions={ListProduct} prod={prod}/>

{//<input value={toor.text} onChange={formUpdate} name="text" placeholder="products"/>
}
{
          // input box City
        }
   

    {filedA ? (      
    <Autocomplete
      value={city}
      color="error"
      disablePortal
      onChange={(event, newValue) => {
        setCity(newValue);
      }}
      
      id="combo-box-demo"
      options={Ville.map((option) => option.ville)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params}   helperText={t("City_is_required")} error label={t("city")} />}
    />):(<Autocomplete
      value={city}
      disablePortal
      onChange={(event, newValue) => {
        setCity(newValue);
      }}
      
      id="combo-box-demo"
      options={Ville.map((option) => option.ville)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={t("city")} />}
    />)  }
   
        {
          // input box Project
        }
     {filedB ?
     (    <Box sx={{ minWidth: 170 }}>
              <FormControl fullWidth error>
              <InputLabel id="demo-simple-select-label">{t("projects")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toor.type_id}
                  name="type_id"
                  label="Type Project"
                  onChange={formUpdate}
                >
      {dataType.types?.map((e) => {
                return (
                  <MenuItem value={e?.slug} >{e?.name === 'Pharmacy' && t("pharmacy") || e?.name === 'Parapharmacy' && t("parapharmacie") || e?.name === 'Clothes' && t("clothes")}</MenuItem>
                );
              })}
    </Select>
     <FormHelperText>{t("Project_is_required")}</FormHelperText>
              </FormControl>
            </Box>):
            
 (   <Box sx={{ minWidth: 170 }}>
              <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">{t("projects")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toor.type_id}
                  name="type_id"
                  label="Type Project"
                  onChange={formUpdate}
                >
      {dataType.types?.map((e) => {
                return (
                  <MenuItem value={e?.slug} >{e?.name === 'Pharmacy' && t("pharmacy") || e?.name === 'Parapharmacy' && t("parapharmacie") || e?.name === 'Clothes' && t("clothes")}</MenuItem>
                );
              })}
    </Select>
   
              </FormControl>
            </Box>)
           }
        
         <button className="send"  onClick={goToSearchPage}><span class="icon-ic24-search"></span></button>
        </div>
   )} </>);
  }
export default withRouter(SearchBox);