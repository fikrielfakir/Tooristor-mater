import React, { useState } from "react";
import { message } from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Loader, Placeholder, Toggle } from 'rsuite';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GET_TYPES } from './../../../../components/GraphQL/type.graphql';
import { CREATE_TAG } from './../../../../components/GraphQL/tags.graphql';
import { useTranslation } from 'react-i18next';


function AddCategory(props) {
  const { t } = useTranslation();
  // Tye Hooks top
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = React.useState(true);
  const [modalContent, setModalContent] = useState();
  const [newForm, setNewForm] = useState({ name: '', type: '', details: '' });

  // Type Query methode
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);

  // Type Mutation methode
  const [createTag, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_TAG);


  // Type Logique

  // LOADER SUCCESS
  if (AddshopsData && !AddshopsError && !AddshopsLoading) {
    message.success('This is a Product Created ');
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
  const handlecreateTag = async (event) => {
    event.preventDefault()
    try {
      const createtags = await createTag({
        variables: {
          "input": {
            name: newForm.name,
            type: { connect: newForm.type },
            details: newForm.details
          }
        }
      }).then(() => { window.location.reload(); });
      return createtags;
    } catch (e) {
      console.log(e);
    }
  }
  console.log("type", newForm.type)
  return (
    <div>
      {showModal && (
        <form className="input-field" onSubmit={handleUpdateProduct}>
          <input className="input-name" type="text" value={modalContent.name} onChange={modalUpdate} name="name" />
          <button type="submit">Create</button>
        </form>
      )}

      <div className="CinputSetting Create">
        {LoadingType ? (
          <div>
            <Placeholder.Paragraph rows={8} />
            <Loader center content="loading" />
          </div>
        ) : (
          <form className="inputSetting" onSubmit={handlecreateTag}>
            <input className="InSetting w100" type="text" placeholder={t("name")} name="name" value={newForm.name} onChange={formUpdate} />
            <textarea className="InSetting w100" placeholder={t("details")} name="details" value={newForm.details} onChange={formUpdate} />
            <div className="Inputflex">
            </div>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t("Type_Project")}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.type}
                  name="type"
                  label={t("Type_Project")}
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

export default AddCategory;
