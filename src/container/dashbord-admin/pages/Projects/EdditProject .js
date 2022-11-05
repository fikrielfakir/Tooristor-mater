import React from "react";
import { Loader, Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite';
import { useQuery, useMutation } from "@apollo/client";
import { useState } from 'react';
import { UPLOAD_MUTATE } from './../../../../components/GraphQL/upload.graphql';
import { UPDATE_SHOP } from './../../../../components/GraphQL/shops.graphql';
import { message, Result} from 'antd';
import { GET_CUSTOMERS } from './../../../../components/GraphQL/customers.graphql';
// import Upload from "./../../../../components/uploadProfile"
import Box from '@mui/material/Box';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import Ville from "./../../../../Assets/ville";
// import UploadGallery from "./../../../../components/UploadGallery"
// import FormInput from "../../components/FromInput"
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Time from "./../../../../components/UI/Time"
import moment from 'moment';
import { useTranslation } from 'react-i18next';



const EdditShop = (props) => {
  const {t} = useTranslation();
  // console.log("props.gallery",props.gallery)
  // QUERY GET CUSTOMER
  const { loading: laodinguser, error: erroruser, data: datauser } = useQuery(GET_CUSTOMERS);
  const [dataFile, setdataFile] = useState({ gallery: [props.gallery] });
  const success = () => {
    message.success('Updated success ');
  };
  const error = () => {
    message.error('Some error in Form');
  };

  // BUILD MUTATION FOR LOGIN_USER
  const [uploadGallery, { loading: GalleryLoading, error: GalleryError, data: DataGallery }] = useMutation(UPLOAD_MUTATE);

  const [updateShop, { loading: LoadingShop, error: ErrorShop, data: dataShop }] = useMutation(UPDATE_SHOP,{
    onCompleted: () => success(),
    onError: () => error(),
  });
  const [upload, { loading: UploadLoading, error: UploadError, data: DataUplad }] = useMutation(UPLOAD_MUTATE);

  const [selectedTime, setSelectedTime] = useState({
    mondayTo: props.workhours?.monday[0]?.To,
    mondayFrom: props.workhours?.monday[0]?.From,

    tuesdayTo: props.workhours?.tuesday[0]?.To,
    tuesdayFrom: props.workhours?.tuesday[0]?.From,

    wednesdayTo: props.workhours?.wednesday[0]?.To,
    wednesdayFrom: props.workhours?.wednesday[0]?.From,

    thursdayTo: props.workhours?.thursday[0]?.To,
    thursdayFrom: props.workhours?.thursday[0]?.From,

    fridayTo: props.workhours?.friday[0]?.To,
    fridayFrom:props.workhours?.friday[0]?.From,

    saturdayTo: props.workhours?.saturday[0]?.To,
    saturdayFrom: props.workhours?.saturday[0]?.From,

    sundayTo: props.workhours?.sunday[0]?.To,
    sundayFrom: props.workhours?.sunday[0]?.From,
  });
  const onSelect = (name, value) => {
    const timeString = moment(value).format("HH:mm");
    setSelectedTime({
      ...selectedTime,
      [name]: timeString
    });
  }

  //function for handle updates on the create shop form
  const formUpdate = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  if (erroruser) return (erroruser.message)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const UpdateShops = await updateShop({
       
        variables: {
          id: props.id,
          "input": {
            // owner_id: Number(newForm.user_id),
            name: props.name,
            description: props.description,
            // logo: { 'original': FileUrl.original, 'thumbnail': FileUrl.thumbnail, 'id': FileUrl.id },
            // address: { 'state': newForm.state, 'city': newForm.city, 'street_address': newForm.street_address },
            // settings: { location: { 'state': newForm.state }, contact: newForm.contact },
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
                  From: selectedTime.thursdayFrom
                }
              ],
              friday: [
                {
                  To: selectedTime.fridayTo,
                  From: selectedTime.fridayFrom
                }
              ],
              saturday: [
                {
                  To: selectedTime.saturdayTo,
                  From: selectedTime.saturdayFrom
                }
              ],
              sunday: [
                {
                  To: selectedTime.sundayTo,
                  From: selectedTime.sundayFrom
                }
              ]
            },
          }
        },
      });
      return UpdateShops
    } catch (e) {
      console.log(e);
    }
  }
  console.log("owner", props.valueday)
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
  console.log("timeFrom",props.id)
  return (
    <div className="FormInput">
              {/* {DataGallery ?
        (
<div className="dropUpload">
   <Result
    status="success"
    title="Uploaded Success"
  />
  </div>
        ):( */}
        
        {/* <div className="dropUpload">
          <UploadGallery
            disabled={false}
            value={dataFile.gallery}
            gallery={props.gallery}
            onChange={(e) => {
              setdataFile({ ...dataFile, gallery: e });
            }}
          />
          <button onClick={handleUpload} className="sumbit Upload"><i class="fas fa-upload"></i>Upload</button>
        </div>  */}
      
        {/* )
          
        } */}
      {LoadingShop || laodinguser ? (
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader center content="loading" />
        </div>
      ) : (

        <form onSubmit={handleSubmit}><div className="ProfileSetting">

          <div className="inputSetting side">
            <h5>{t("Basic_Info")}</h5>
            <Box sx={{ minWidth: 410 }}>
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Owner Shop *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props?.owner}
                  name="owner_id"
                  label="List Users"
                  onChange={props.modalUpdate}
                >
                  {datauser.users.data?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name} - {e?.email} - {e?.is_active}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
            </Box>
            <input className="InSetting w100" placeholder="name" name="name" value={props.name} onChange={props.modalUpdate} />
            <textarea className="InSetting w100" placeholder="description" name="description" value={props.description} onChange={props.modalUpdate} />
            <h5>{t("WorkHours")}</h5>

            {days.map((day, index) => {
              return (
                <>
                  <h6>{day}</h6>
                  <div className="Inputflex">
                    <p>Form<Time why="From" value={selectedTime[day+"From"]} name={day + "From"} className="InSetting w50" onSelect={(e) => onSelect(day + "From", e)} /></p>
                    <p>To<Time why="From" value={selectedTime[day+"To"]} name={day + "To"} className="InSetting w50" onSelect={(e) => onSelect(day + "To", e)} /></p>
                  </div>
                </>);
            })
            }
          </div>
          <div className="validationbutton"><button className="sumbit send">Send</button><button className="sumbit cancel">Cancel</button></div>
        </div></form>
      )}
    </div>
  );
};

export default EdditShop;
