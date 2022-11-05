import React from "react";
import { Loader, Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite';
import { useQuery, useMutation } from "@apollo/client";
import { message, Result} from 'antd';
import { useState } from 'react';
import { UPLOAD_MUTATE } from './../../../../components/GraphQL/upload.graphql';
import { CREATE_SHOP } from './../../../../components/GraphQL/shops.graphql';
import { GET_CUSTOMERS } from './../../../../components/GraphQL/customers.graphql';
// import Upload from "./../../../../components/uploadProfile"
import Box from '@mui/material/Box';
// import GeoSearch from "./../../../../components/UI/Map/Geolocation"
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Ville from "./../../../../Assets/ville";
import UploadGallery from "./../../../../components/UploadGallery"
// import FormInput from "../../components/FromInput"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Time from "./../../../../components/UI/Time"
import moment from 'moment';
import { useTranslation } from 'react-i18next';



const AddUser = () => {
  const {t} = useTranslation();
  const [dataFile, setdataFile] = useState({ gallery: [] });
  // QUERY GET CUSTOMER
  const { loading: laodinguser, error: erroruser, data: datauser } = useQuery(GET_CUSTOMERS);


  // BUILD MUTATION FOR LOGIN_USER
  const [createShop, { loading: LoadingShop, error: ErrorShop, data: dataShop }] = useMutation(CREATE_SHOP);
  const [uploadGallery, { loading: GalleryLoading, error: GalleryError, data: DataGallery }] = useMutation(UPLOAD_MUTATE);
  const [upload, { loading: UploadLoading, error: UploadError, data: DataUplad }] = useMutation(UPLOAD_MUTATE);

  const [newForm, setNewForm] = useState({ name: '', description: '', city: '', state: '', street_address: '', lng: '', lat: '', contact: '', user_id: '' })
  const [selectedTime, setSelectedTime] = useState({
    mondayTo: "23:00",
    mondayFrom: "08:00",

    tuesdayTo: "00:00",
    tuesdayFrom: "00:00",

    wednesdayTo: "00:00",
    wednesdayFrom: "00:00",

    thursdayTo: "00:00",
    thursdayFrom: "00:00",

    fridayTo: "00:00",
    fridayFrom: "00:00",

    saturdayTo: "00:00",
    saturdayFrom: "00:00",

    sundayTo: "08:00",
    sundayFrom: "08:30",
  });

  const onSelect = (name, value) => {
    const timeString = moment(value).format("HH:mm");
    setSelectedTime({
      ...selectedTime,
      [name]: timeString
    });
    console.log("sundayTo", selectedTime.sundayTo);
    console.log("sundayFrom", selectedTime.sundayFrom);
  }

  //function for handle updates on the create shop form
  const formUpdate = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }
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

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  if (erroruser) return (erroruser.message)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createuser = await createShop({
        variables: {
          "input": {
            owner_id: Number(newForm.user_id),
            name: newForm.name,
            description: newForm.description,
            logo: Profile,
            cover_image:Gallery,
            address: { 'state': newForm.state, 'city': newForm.city, 'street_address': newForm.street_address },
            settings: { location: { 'state': newForm.state, 'lat': Number(newForm.lat), 'lng': Number(newForm.lng) }, contact: newForm.contact },

            workhours: {
              monday: [
                {
                  To: selectedTime.mondayTo,
                  From: selectedTime.mondayFrom
                }
              ],
              tuesday: [
                {
                  To: selectedTime.tuesdayTo,
                  From: selectedTime.tuesdayFrom
                }
              ],
              wednesday: [
                {
                  To: selectedTime.wednesdayTo,
                  From: selectedTime.wednesdayFrom
                }
              ],
              thursday: [
                {
                  To: selectedTime.thursdayTo,
                  From:selectedTime.thursdayFrom
                }
              ],
              friday: [
                {
                  To: selectedTime.fridayTo,
                  From:selectedTime.fridayFrom
                }
              ],
              saturday: [
                {
                  To:selectedTime.saturdayTo,
                  From:selectedTime.saturdayFrom
                }
              ],
              sunday: [
                {
                  To: selectedTime.sundayTo,
                  From:selectedTime.sundayFrom
                }
              ]
            },
          }
        },
      }).then(() => { window.location.reload(); });
      return createuser
    } catch (e) {
      console.log(e);
    }
  }
  console.log("owner", newForm.user_id)
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
  console.log("files", FileUrl)
  return (
    <div className="FormInput">
       {DataGallery ?
        (
<div className="dropUpload">
   <Result
    status="success"
    title={t("Uploaded_Success")}
  />
  </div>
        ):(
        <><h5>{t("Step")} 1 : {t("Upload_Profile_and_Gellery")}</h5>
        <p>⚠ {t("The_first_image_listed_will_be_the_store_logo")}</p>
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
      {LoadingShop || laodinguser ? (
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader center content="loading" />
        </div>
      ) : (
       
        <form onSubmit={handleSubmit}><div className="ProfileSetting">

          <div className="inputSetting side">
            <h5>{t("Step")} 2 :{t("Basic_Info")}</h5>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Select_Owner_Shop")} *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.user_id}
                  name="user_id"
                  label="List City"
                  onChange={formUpdate}
                >
                  {datauser.users.data?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name} - {e?.email} - {e?.is_active}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <input className="InSetting w100" placeholder={t("name")} name="name" value={newForm.name} onChange={formUpdate} />
            <textarea className="InSetting w100" placeholder={t("description")} name="description" value={newForm.description} onChange={formUpdate} />
            <h5>{t("Step")} 3 :{t("Shop_Address")}</h5>
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
              {/* <MapComp/> */}
            </Box>
            {/* <GeoSearch/> */}
            <div className="Inputflex">
              <input className="InSetting w50" placeholder="lng" name="lng" value={newForm.lng} onChange={formUpdate} />
              <input className="InSetting w50" placeholder="lat" name="lat" value={newForm.lat} onChange={formUpdate} />
            </div>
            <input className="InSetting w100" placeholder="State" name="state" value={newForm.state} onChange={formUpdate} />
            <input className="InSetting w100" placeholder="Street Address" name="street_address" value={newForm.street_address} onChange={formUpdate} />
            <h5>{t("Step")} 4 :{t("Shop_Settings")}</h5>
            {
              //<input className="InSetting w100" placeholder="Set location from map" name="street_address" value={newForm.} onChange={formUpdate} />
            }
            <input className="InSetting w100" placeholder="Contact" name="contact" value={newForm.contact} onChange={formUpdate} />
            <h5>{t("Step")} 5 :{t("WorkHours")}</h5>

            {days.map((day, index) => {
              return (
                <>
                  <h6>{day}</h6>
                  <div className="Inputflex">
                    <p>{t("From")}<Time why="From" name={day + "From"} className="InSetting w50" onSelect={(e) => onSelect(day + "From", e)} /></p>
                    <p>{t("To")}<Time why="From" name={day + "To"} className="InSetting w50" onSelect={(e) => onSelect(day + "To", e)} /></p>
                  </div>
                </>);
            })
            }
          </div>
          <div className="validationbutton"><button className="sumbit send">{t("Send")}</button><button className="sumbit cancel">{t("Cancel")}</button></div>
        </div></form>
      )}
      </>}
    </div>
  );
};

export default AddUser;