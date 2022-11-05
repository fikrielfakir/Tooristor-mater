import React, { useState } from "react";
import { message } from 'antd';
import { useQuery, useMutation} from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Loader, Placeholder,Toggle } from 'rsuite';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UPDATE_CATEGORY, GET_CATEGORIES } from '../../../../components/GraphQL/categories.graphql';
import { GET_TYPES } from '../../../../components/GraphQL/type.graphql';
import { convertLegacyProps } from "antd/lib/button/button";


function EditCategory(props,URL) {

  const [content, setContent] = React.useState(true);
  const [modalContent, setModalContent] = React.useState();

  // Type Query methode
  const { loading: LoadingCategory, error: ErrorCategory, data: DataCategory } = useQuery(GET_CATEGORIES);
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);
  const { data: Datacategories, loading: ProductLoading, error: producterro } = useQuery(GET_CATEGORIES, {
  }); 
  // Type Mutation methode
  const [updateCategory, { loading: LoadingUpdateProduct, error: UpProductError, data: UpdataProduct }] = useMutation(UPDATE_CATEGORY);

  // LOADER SUCCESS
  if (!LoadingUpdateProduct && UpdataProduct) {
    message.success(' Category it Updated ')
  }

  
  let listProducts;
  if (!ProductLoading && !producterro) {
      listProducts = Datacategories.categories.data;
  }

  // LOADER LOGIAUE
  if (LoadingUpdateProduct)
    return message.loading('Please Wait');
  // allows admin to update the item information on the admin page 
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const updatingShop = await updateCategory({

        variables: {
          "input": {  
            id: props.modle?.id,
            name: props.modle?.name,
            type:{connect:props.modle?.type},
            details: props.modle?.details,
            parent:Number(props.modle?.parent)
           }
        },
      });
      return updatingShop;
    }
    catch (e) {
      console.log(e);
    }
  }; 
  console.log("name", props.type?.id)
  return (
    <div>
      <div className="CinputSetting Create">
        { LoadingType ? (
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader center content="loading" />
        </div>
        ):(
        <form className="inputSetting" onSubmit={handleUpdateProduct}>
          <input className="InSetting w100" type="text" placeholder="name" name="name" value={props.name} onChange={props.modalUpdate} />
          <textarea className="InSetting w100" placeholder={t("details")} name="details" value={props?.details} onChange={props.modalUpdate} />
         
          <Box sx={{ minWidth: 410 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{t("Type_Project")}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.type?.id}
                name="type"
                label={t("Type_Project")}
                onChange={props.modalUpdate} >
                {DataType.types?.map(e => {
                  return (
                    <MenuItem value={e?.id} >{e?.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <div className="inlIne"><h5>{t("Parent")}</h5>    <Toggle checked={content} onChange={setContent} /></div>
        
          { !content && (
          <Box sx={{ minWidth: 410 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props?.parent}
                name="parent"
                label={t("Parent")}
                onChange={props.modalUpdate} 
              >
                  {listProducts.map((e) => {
                  return (
                    <MenuItem value={e?.id} >{e?.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>)}
          <div className="validationbutton"><button className="sumbit send" type="submit">{t("Send")}</button><button onClick={props.onClick} className="sumbit cancel" type="Cancel">{t("Cancel")}</button></div>
        </form>
        )}
      </div>
      {/* Spreadsheet Labels */}
      <div className="admin-product">


      </div>
    </div>
  );
}

export default EditCategory;
