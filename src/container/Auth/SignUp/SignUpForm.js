import React, { useState } from "react";
import { collection, getDocs, addDoc, collectionGroup } from 'firebase/firestore';
import { db } from './../../../library/init-firebase';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { message, Result } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import { useQuery } from "@apollo/client";
// import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';
// import { doc, updateDoc } from 'firebase/firestore';
// import { visitsCollectionRef } from './../../../library/init-firebase';
import { GET_TYPES } from './../../../components/GraphQL/type.graphql';
import { GET_CATEGORIES } from './../../../components/GraphQL/categories.graphql';
import { useHistory } from 'react-router-dom';


const SignUpForm = () => {
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);
  const { loading: LoadingShop, error: ErrorCategory, data: DataCategory } = useQuery(GET_CATEGORIES);
  const history = useHistory()

  const [firstname, setfirstname] = useState(null);
  const [lastname, setlastname] = useState(null);
  const [project, setproject] = useState(null);
  const [adresse, setadresse] = useState(null);
  const [category, setcategory] = useState(null);
  const [cin, setcin] = useState(null);
  const [phone, setphone] = useState(null);
  const [email, setemail] = useState(null);
  const [description, setdescription] = useState(null);

  function handleSubmit(e) {
    e.preventDefault()
    if ( firstname !== null  && lastname !== null && project !== null && adresse !== null && category !== null && cin !== null && phone !== null && email !== null && description !== null){
    const visitsCollectionRefs = collection(db, 'contact')
    addDoc(visitsCollectionRefs, { firstname, lastname, project, adresse, category, cin, phone, email, description })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
    message.loading('Please Wait').then(() => { message.success('The request has been sent successfully') && history.push(`/`); }); }
    else{
      message.error("Review your request, you may have forgotten to include a field")
    }
  }
  console.log("type", project)
  return (
    <div className="contactForm">
      <div >
        <form className="inputSetting" onSubmit={handleSubmit}>
          <div className="InputForm">
            <input className="w50" placeholder="First name" value={firstname} onChange={e => setfirstname(e.target.value)} />
            <input className="w50" placeholder="Last name" value={lastname} onChange={e => setlastname(e.target.value)} />
          </div>
          {/* <input className="InFrom w100" placeholder="Project Name"    /> */}

          <Box sx={{ minWidth: 410 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Project*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                name="project"
                label="List City"
                onChange={e => setproject(e.target.value)}
              >
                {DataType?.types.map(e => {
                  return (
                    <MenuItem value={e?.name} >{e?.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <input className="InFrom w100" placeholder="Project address" value={adresse} onChange={e => setadresse(e.target.value)} />
          <Box sx={{ minWidth: 410 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Category*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                name="category"
                label="List City"
                onChange={e => setcategory(e.target.value)}
              >
                {DataCategory?.categories.data?.map(e => {
                  return (
                    <MenuItem value={e?.name} >{e?.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <div className="InputForm">
            <input className="w50" placeholder="C.I.N" value={cin} onChange={e => setcin(e.target.value)} />
            <input className="w50" placeholder="Phone" onChange={e => setphone(e.target.value)} value={phone} />
          </div>
          <input className="InFrom w100" placeholder="Email" onChange={e => setemail(e.target.value)} value={email} />
          <textarea className="InFrom w100" placeholder="Description" onChange={e => setdescription(e.target.value)} value={description} />
          <div className="validationbutton"><button className="sumbit send btns">Send</button></div>
        </form>
      </div>
    </div >
  );
};

export default SignUpForm;
