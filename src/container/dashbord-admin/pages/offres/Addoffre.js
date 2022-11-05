import React, { useState } from "react";
import { message, Result } from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Loader, Placeholder, Toggle } from 'rsuite';
import { DatePicker, Stack } from 'rsuite';
import UploadGallery from "./../../../../components/UploadGallery"
import moment from 'moment';
import { UPLOAD_MUTATE } from "components/GraphQL/upload.graphql"
import QR from "./../../components/QR"
import FormControl from '@mui/material/FormControl';
import "antd/dist/antd.css";
import Select from '@mui/material/Select';
import { GET_PRODUCTS } from "components/GraphQL/products.graphql";
import { GET_SHOPS } from "components/GraphQL/shops.graphql";
import { CREATE_COUPON } from './../../../../components/GraphQL/coupons.graphql';
import { useTranslation } from 'react-i18next';


function Addoffres(props) {
  const {t} = useTranslation();
  const dateFormat = 'YYYY/MM/DD';
  // Tye Hooks top
  // const [showModal, setShowModal] = useState(false);
  // const [content, setContent] = React.useState(true);
  const [modalContent, setModalContent] = useState();
  const [Active, setActive] = useState(new Date());
  const [dataFile, setdataFile] = useState({ gallery: [] });
  const [Expire, setExpire] = useState(new Date());
  const [newForm, setNewForm] = useState({ description: '', shop: '', product_id: '', amount: '' });

  // Type Query methode
  const { loading: LoadingProduct, error: ErrorProduct, data: DataProduct } = useQuery(GET_PRODUCTS);
  const [uploadGallery, { loading: GalleryLoading, error: GalleryError, data: DataGallery }] = useMutation(UPLOAD_MUTATE);
  const { data: DataShops, loading: LoadingShop, error: ErrorShop } = useQuery(GET_SHOPS, {
  });

  // Type Mutation methode
  const [createCoupon, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_COUPON);


  
  // GENERATE CODE RENDOME
  function generateUID(length) {
    return window.btoa(String.fromCharCode(...window.crypto.getRandomValues(new Uint8Array(length * 2)))).replace(/[+/]/g, "").substring(0, length);
  }


  // LOADER SUCCESS
  if (AddshopsData && !AddshopsError && !AddshopsLoading) {
    message.success('This is a Offre Created ');
  }
  // LOADER LOGIAUE
  if (AddshopsLoading)
    return message.loading('Please Wait');

  // ERROR LOGIQUE
  if (AddshopsError) return message.error('Some Error !');

  // function to update the row info through the modal
  const modalUpdate = (event) => {
    setModalContent({ ...modalContent, [event.target.name]: event.target.value })
    console.log('update---log');
  }

  //function for handle updates on the create product form
  const formUpdate = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }
  // creates a new product and adds it to the selected category
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

  const handlecreateCoupon = async (event) => {
    event.preventDefault()
    try {
      const createShopMutation = await createCoupon({
        variables: {
          "input": {
            code: generateUID(12),
            shop_id: newForm.shop,
            product_id: newForm.product_id,
            description: newForm.details,
            image: Profile,
            type: "PERCENTAGE_COUPON",
            amount: Number(newForm.amount),
            expire_at: Expire,
            active_from: Active
          }
        }
      }).then(() => { window.location.reload(); });
      return createShopMutation;
    } catch (e) {
      console.log(e);
    }
  }
  console.log("shop", newForm.shop)
  console.log("product", newForm.product_id)
  console.log("Date", Active, Expire)




  return (
    <div>

      {DataGallery ?
        (
          <div className="dropUpload">
            <Result
              status="success"
              title={t("Uploaded_Success")}
            />
          </div>
        ) : (
          <>
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
      <div className="CinputSetting Create">
        {LoadingProduct ? (
          <div>

            <Placeholder.Paragraph rows={8} />
            <Loader center content="loading" />
          </div>
        ) : (
          <form className="inputSetting" onSubmit={handlecreateCoupon}>
            <QR
              value={generateUID(12)}
            />
            <input className="InSetting w100" type="text" placeholder="code de offre" name="code" disabled value={"Code de Offre: " + generateUID(22)} onChange={formUpdate} />
            <textarea className="InSetting w100" placeholder={t("details")} name="description" value={newForm.description} onChange={formUpdate} />
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("shops")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.shop}
                  name="shop"
                  label={t("shops")}
                  onChange={formUpdate}
                >
                  {DataShops?.shops.data?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("products")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.product_id}
                  name="product_id"
                  label="Products"
                  onChange={formUpdate}
                >
                  {DataProduct?.products.data?.map(e => {
                    if (e.shop.id === newForm.shop)
                      return (
                        <MenuItem value={e?.id} >{e?.name}</MenuItem>
                      );
                  })}
                </Select>
              </FormControl>
            </Box>
            <input className="InSetting w100" type="text" placeholder="Amount" name="amount" value={newForm.amount} onChange={formUpdate} />
            <Stack direction="column" alignItems="flex-start" spacing={6}>
              <div style={{ display: "flex", gap: 10 }}>
                <p>{t("Active_From")}</p><DatePicker placement="topStart" value={Active} onChange={setActive} name="active_from" />
                <p>{t("Expire_At")}</p><DatePicker placement="topStart" value={Expire} onChange={setExpire} name="expire_at" /></div>
            </Stack>
            <div className="validationbutton"><button className="sumbit send" type="submit">{t("Send")}</button><button onClick={props.onClick} className="sumbit cancel" type="Cancel">{t("Cancel")}</button></div>
          </form>
        )}

      </div>
        </>
        
        }
      {/* Spreadsheet Labels */}
      <div className="admin-product">


      </div>
    </div>
  );
}

export default Addoffres;
