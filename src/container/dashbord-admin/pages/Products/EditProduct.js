import React, { useState } from "react";
import { message } from 'antd';
import { Toggle } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import { useQuery, useMutation } from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Loader, Placeholder } from 'rsuite';
import FormControl from '@mui/material/FormControl';
import Upload from "../../../../components/uploadProfile"
import UploadGallery from "../../../../components/UploadGallery"
import Select from '@mui/material/Select';
import { GET_TYPES } from '../../../../components/GraphQL/type.graphql';
import { GET_TAGS } from './../../../../components/GraphQL/tags.graphql';
import { GET_SHOPS } from '../../../../components/GraphQL/shops.graphql';
import { UPLOAD_MUTATE } from '../../../../components/GraphQL/upload.graphql';
import { UPDATE_PRODUCT } from '../../../../components/GraphQL/products.graphql';
import { useTranslation } from 'react-i18next';
import Ville from "./../../../../Assets/ville";
import Tags from "./tags"
import { GET_CATEGORIES } from '../../../../components/GraphQL/categories.graphql';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function EditProducts(props, URL) {
  const {t} = useTranslation();
const theme = useTheme();

  // Type Query methode
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);
  const { loading: LoadingTags, error: ErrorTags, data: dataTgas } = useQuery(GET_TAGS);
  const { loading: LoadingShop, error: Errorshop, data: DataShop } = useQuery(GET_SHOPS);
  const { loading: LoadingCategory, error: ErrorCategory, data: DateCategory } = useQuery(GET_CATEGORIES);


//   var ListTag = props.modle.tags?.map(e => {
//     return (e);
//  }); 
//   var elementag = Update.tags?.map(e => {
//     return (e?.id);
//  });
  const [Update, seUpdate] = useState({ id: props.modle.id, name: props.modle.name, description: props.modle.description, city: props.modle.city, price: props.modle.price, min_price: props.modle.min_price, max_price: props.modle.max_price, unit: props.modle.unit, type_id: props.modle.type.id, shop_id: props.modle.shop_id, in_stock: props.modle.in_stock, categories:props.modle.categories[0]});
  const [stock, setinstock] = useState(Update.in_stock)


  // Type Mutation methode
  const [updateProduct, { loading: LoadingUpdateProduct, error: UpProductError, data: UpdataProduct }] = useMutation(UPDATE_PRODUCT);
  const [upload, { loading: UploadLoading, error: UploadError, data: DataUplad }] = useMutation(UPLOAD_MUTATE);

  // if (UpProductError) return (UpProductError.message)
  // LOADER SUCCESS
  if (!LoadingUpdateProduct && UpdataProduct) {

    message.success('This is a Product Created ').then(() => { window.location.reload(); });
  }
  // LOADER LOGIAUE
  if (LoadingUpdateProduct)
    return message.loading('Please Wait');
  // allows admin to update the item information on the admin page 

// const inStock = (e) => {
//   e.preventDefault()
//   setinstock(stock = e)

// }
 console.log("instock",stock) 
  const OnChangeUpdate = (e) => {
    seUpdate({ ...Update, [e.target.name]: e.target.value });
    console.log("Test Chnage",Update)
  }
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const UpdateProducts = await updateProduct({
        variables: {
         
          "input": { 
            id: Update.id,
            name: Update.name,
            description: Update.description,
            price: Update.price,
            min_price:  Update.min_price,
            max_price:Update.max_price,
            unit: Update.unit,
            shop_id:Update.shop_id,
            type_id: Number(Update.type_id),
            city: Update.city,
            product_type: "SIMPLE",
            // categories: Update.categories,
            status: "PUBLISH",
            in_stock: stock,
            is_taxable: false}
        },
      });
      return UpdateProducts;
    }
    catch (e) {
      console.log(e);
    }
  };
  const formUpload = (e) => {
    e.preventDefault();
    upload({ variables: { attachment: e.target.files[0] } });
  }
  let FileUrl;

  if (DataUplad) {
    FileUrl = DataUplad.upload[0]
  }

  if (DataUplad) {
    URL = DataUplad.upload.map(e => {
      return (e.original);
    });
  }
  console.log("Test", Update)
  return (
    <div>
      <div className="CinputSetting Create">
        {/* <div className="myvectore">

          <Upload
            loading={UploadLoading}
            isThereAFile={DataUplad}
            url={props.modle?.image.original}
            UploadFile={formUpload}
            uploadImage={upload}
          />
        </div> */}
        {LoadingType || LoadingShop || LoadingShop || LoadingCategory ? (
          <div>
            <Placeholder.Paragraph rows={8} />
            <Loader center content="loading" />
          </div>
        ) : (
          <form className="inputSetting" onSubmit={handleUpdateProduct}>
            <h5>{t("Product_in_Stock")}</h5>
             <Toggle onChange={e => setinstock(e)} size="lg" checkedChildren="YES" unCheckedChildren="NO" defaultChecked={stock}/>
            <input className="InSetting w100" type="text" placeholder="name" name="name" value={Update.name} onChange={OnChangeUpdate} />
            <textarea className="InSetting w100" placeholder={t("details")} name="description" value={Update.description} onChange={OnChangeUpdate} />
            <div className="Inputflex">
              <input className="InSetting w50" type="number" placeholder="price" name="price" value={Update.price} onChange={OnChangeUpdate} />
              <input className="InSetting w50" type="number" placeholder="max price" name="max_price" value={Update.max_price} onChange={OnChangeUpdate} />
              <input className="InSetting w50" type="number" placeholder="min price" name="min_price" value={Update.min_price} onChange={OnChangeUpdate} />
              <input className="InSetting w50" type="text" placeholder="unit" name="unit" value={Update.unit} onChange={OnChangeUpdate} />
            </div>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Select_City")} *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Update.city}
                  name="city"
                  label="List City"
                  onChange={OnChangeUpdate}
                >
                  {Ville?.map(e => {
                    return (
                      <MenuItem value={e?.ville} >{e?.ville}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Select_Shop")}</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Update?.shop_id}
                  name="shop_id"
                  label="List Shops"
                  onChange={OnChangeUpdate}
                >
                  {DataShop.shops.data?.map(e => {
                    // if (e.address.city === newForm.city)
                    return (
                      <MenuItem value={e?.id} key={e?.id}>{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Type_Project")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Update.type_id}
                  name="type_id"
                  label="Type Project"
                  onChange={OnChangeUpdate}
                >
                  {DataType.types?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            {/* <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ٍSelect Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Update.categories}
                  name="categories"
                  label="List categories"
                  onChange={OnChangeUpdate}
                >
                  {DateCategory.categories.data?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <h5>Tags</h5>
            <FormControl sx={{ m: 1, minWidth: 410 }}>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={Update.tags}
                onChange={OnChangeUpdate}
                name="tags"
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {dataTgas?.tags.data?.map(e => {
                  return (
                    <MenuItem key={e.id} value={e?.id} style={getStyles(e.id, Update.tags, theme)} >{e?.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}

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

export default EditProducts;
