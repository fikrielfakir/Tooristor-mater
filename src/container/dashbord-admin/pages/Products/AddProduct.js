import React, { useState, useEffect } from "react";
import { message, Result} from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import { Loader, Placeholder } from 'rsuite';
import Upload from "./../../../../components/uploadProfile"
import UploadGallery from "./../../../../components/UploadGallery"
import Select from '@mui/material/Select';
import { GET_TYPES } from './../../../../components/GraphQL/type.graphql';
import { GET_SHOPS } from './../../../../components/GraphQL/shops.graphql';
import { UPLOAD_MUTATE } from './../../../../components/GraphQL/upload.graphql';
import { GET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from './../../../../components/GraphQL/products.graphql';
import Ville from "./../../../../Assets/ville";
import Tags from "./tags"
import { useTheme } from '@mui/material/styles';
import { GET_CATEGORIES } from './../../../../components/GraphQL/categories.graphql';
import { GET_TAGS } from './../../../../components/GraphQL/tags.graphql';
import { useTranslation } from 'react-i18next';



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
function AdminProducts(props) {
  const {t} = useTranslation();

  const theme = useTheme();
  // Tye Hooks top
  const [Completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataFile, setdataFile] = useState({ gallery: [] });
  console.log("Gallery", dataFile.gallery)

  const [modalContent, setModalContent] = useState();
  const [newForm, setNewForm] = useState({ name: '', description: '', price: '', min_price:'', max_price:'', unit: '', type_id: '', shop_id: '', status: '', product_type: '', in_stock: '', is_taxable: '', city: '',tags: [], categories: '', image: '' });

  // Type Query methode
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);
  const { loading: LoadingShop, error: Errorshop, data: DataShop } = useQuery(GET_SHOPS);
  const { loading: LoadingCategory, error: ErrorCategory, data: DateCategory } = useQuery(GET_CATEGORIES);
  const { loading: LoadingTags, error: ErrorTags, data: dataTgas } = useQuery(GET_TAGS);
  const { loading: shopsLoading, error: shopsError, data: shopsData } = useQuery(GET_PRODUCTS, { pollInterval: 1000 });

  // Type Mutation methode
  const [updateProduct, { loading: UpshopsLoading, error: UpshopsError, data: UpshopsData }] = useMutation(UPDATE_PRODUCT);
  const [upload, { loading: UploadLoading, error: UploadError, data: DataUplad }] = useMutation(UPLOAD_MUTATE);
  const [uploadGallery, { loading: GalleryLoading, error: GalleryError, data: DataGallery }] = useMutation(UPLOAD_MUTATE);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [createProduct, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_PRODUCT);


  const success = () => {
    message.success('This is a success message');
  };

  const error = () => {
    message.error('This is an error message');
  };

  const warning = () => {
    message.warning('This is a warning message');
  };

  // Type Logique

  // LOADER SUCCESS
  if (AddshopsData && !AddshopsError && !AddshopsLoading) {
    message.success('This is a Product Created ');
  }
  // LOADER LOGIAUE
  if (AddshopsLoading)
    return message.loading('Please Wait');

  // ERROR LOGIQUE
  if (AddshopsError || UpshopsError || UploadError || UploadError || ErrorType || Errorshop || ErrorCategory) return message.error('Some Error !');

  let productList;

  if (shopsError) return message.error(shopsError.message);
  if (!shopsLoading && !shopsError) {
    productList = shopsData.products.data;
  }

  // function to populate the modal when you click on a line
  const setContent = (event) => {
    // console.log(event.target.parentNode.dataset.index);
    // console.log(productList[event.target.parentNode.dataset.index]);
    setModalContent({ ...productList[event.target.parentNode.dataset.index] })
    modalTrigger();
  }

  // function to update the row info through the modal
  const modalUpdate = (event) => {
    setModalContent({ ...modalContent, [event.target.name]: event.target.value })
    console.log('update---log');
  }

  // function to open/close the modal
  const modalTrigger = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };
  //function for handle updates on the create product form
  const formUpdate = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }
  const formUpload = (e) => {
    e.preventDefault();
    upload({ variables: { attachment: e.target.files[0] } });
  }


  let FileUrl;

  if (DataUplad) {
    FileUrl = DataUplad.upload[0]

  }
  let URL;
  if (DataUplad) {
    URL = DataUplad.upload.map(e => {
      return (e.original);
    });
  }
  // creates a new product and adds it to the selected category
  // loop category 
  let Gallery, Profile
  if (DataGallery) {
    Gallery = DataGallery.upload?.map(({ __typename, ...rest }) => rest);
    Profile = Gallery[0]
  }
  const handleUpload = async (event) => {
    try {
      const upload = await uploadGallery({
        variables: { attachment: dataFile.gallery }
      });
    } catch (err) {
      console.error(err.message);
    }
  }



  // Generate Tag ***********
  // const handleTag = async (event) => {
  //   try {
  //     const upload = await uploadGallery({
  //       variables: { attachment: dataFile.gallery }
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }
  
  const handleCreateProduct = async (event) => {
    try {
        const AddProduct = await createProduct({
          variables: {
            "input": {
              name: newForm.name,
              description: newForm.description,
              price: Number(newForm.price),
              min_price:Number(newForm.min_price) || null,
              max_price:Number(newForm.max_price) || null,
              unit: newForm.unit,
              shop_id: newForm.shop_id,
              city: newForm.city,
              product_type: newForm.product_type || "SIMPLE",
              status: newForm.status || "PUBLISH",
              in_stock: newForm.in_stock || true,
              is_taxable: newForm.is_taxable || false,
              type_id:Number(newForm.type_id),
              categories: newForm.categories,
              tags: newForm.tags,
              image: Profile,
              gallery: Gallery,
            }
          }
        }).then(() => { window.location.reload(); });
        console.log("Add succes", await Gallery)
        return AddProduct
      }
      catch (err) {
      console.error(err.message);
    }

  }
  useEffect(() => {
    if (Gallery) {
      handleCreateProduct
    }
  }, [Gallery])

  console.log("DataGallery", Gallery)
  console.log("Tags Array", newForm.tags)
  return (
    <div>
      <div className="CinputSetting Create">
        {/* <button>Upload</button>
        <div className="myvectore">

          <Upload
            loading={UploadLoading}
            isThereAFile={DataUplad}
            url={URL}
            UploadFile={formUpload}
            uploadImage={upload}
          />
        </div> */}
        {DataGallery ?
        (
<div className="dropUpload">
   <Result
    status="success"
    title={t("Uploaded_Success")}
  />
  </div>
        ):(
        <>
        <h5>{t("Step")} 1 : {t("Upload_Profile_and_Gellery")}</h5>
        <p>⚠ {t("The_first_image_listed_will_be_the_product_profile")}</p>
        <div className="dropUpload">
          <UploadGallery
            disabled={false}
            value={dataFile.gallery}
            onChange={(e) => {
              setdataFile({ ...dataFile, gallery: e });
            }}
          />
          <button onClick={handleUpload} className="sumbit Upload"><i class="fas fa-upload"></i>{t("Upload")}</button>
        </div> 
        </>)
          
        }
         { GalleryLoading &&
        <div>
          {/* <Placeholder.Paragraph rows={8} /> */}
          <Loader center content="loading" />
        </div>
        }
        {DataGallery &&
        <>
        {LoadingType || LoadingShop || LoadingShop || LoadingCategory || UpshopsLoading || shopsLoading? (
          <div>
            <Placeholder.Paragraph rows={8} />
            <Loader center content="loading" />
          </div>
        ) : (
          <form className="inputSetting" onSubmit={handleCreateProduct}>
             <h5>{t("Step")} 2 :{t("Basic_Info")} {t("product")}</h5>
            <input className="InSetting w100" type="text" placeholder="name" name="name" value={newForm.name} onChange={formUpdate} />
            <textarea className="InSetting w100" placeholder={t("details")} name="description" value={newForm.description} onChange={formUpdate} />
            <div className="Inputflex">
              <input className="InSetting w50" type="number" placeholder="price" name="price" value={newForm.price} onChange={formUpdate} />
              <input className="InSetting w50" type="number" placeholder="max price" name="max_price" value={newForm.max_price} onChange={formUpdate} />
              <input className="InSetting w50" type="number" placeholder="min price" name="min_price" value={newForm.min_price} onChange={formUpdate} />
              <input className="InSetting w50" type="text" placeholder="unit" name="unit" value={newForm.unit} onChange={formUpdate} />
            </div>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Select_City")} *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.city}
                  name="city"
                  label="List City"
                  onChange={formUpdate}
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
                  value={newForm.shop_id}
                  name="shop_id"
                  label="List Shops"
                  onChange={formUpdate}
                >
                  {DataShop.shops.data?.map(e => {
                    if (e.address.city === newForm.city)
                      return (
                        <MenuItem value={e?.id} >{e?.name}</MenuItem>
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
                  value={newForm.type_id}
                  name="type_id"
                  label="Type Project"
                  onChange={formUpdate}
                >
                  {DataType.types?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Select_Category")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.categories}
                  name="categories"
                  label="List categories"
                  onChange={formUpdate}
                >
                  {DateCategory.categories.data?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <h5>{t("Tags")}</h5>
            <FormControl sx={{ m: 1, minWidth: 410 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={newForm.tags}
          onChange={formUpdate}
          name="tags"
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
 {dataTgas?.tags.data?.map(e => {
                    return (
                      <MenuItem key={e.id} value={e?.id}  style={getStyles(e.id, newForm.tags, theme)} >{e?.name}</MenuItem>
                    );
                  })}
        </Select>
      </FormControl>
            <div className="validationbutton"><button className="sumbit send" type="submit">{t("Send")}</button><button onClick={props.onClick} className="sumbit cancel" type="Cancel">{t("Cancel")}</button></div>
          </form>
        )}
         </>}
      </div>
      {/* Spreadsheet Labels */}
      <div className="admin-product">


      </div>
    </div>
  );
}
export default AdminProducts;
