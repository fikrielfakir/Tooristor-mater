import React, { useState } from "react";
import { message } from 'antd';
import { useQuery, useMutation} from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Loader, Placeholder,Toggle } from 'rsuite';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import Select from '@mui/material/Select';
import { GET_TYPES } from './../../../../components/GraphQL/type.graphql';
import { CREATE_CATEGORY,GET_CATEGORIES } from './../../../../components/GraphQL/categories.graphql';


function AddCategory(props) {
  const {t} = useTranslation();
  // Tye Hooks top
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = React.useState(true);
  const [modalContent, setModalContent] = useState();
  const [newForm, setNewForm] = useState({ name: '', type: '', details:'', parent:''});

  // Type Query methode
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);
  
  const { data: Datacategories, loading: ProductLoading, error: producterro } = useQuery(GET_CATEGORIES, {
  }); 

  // Type Mutation methode
  const [createCategory, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_CATEGORY);


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

  let listProducts;
  if (!ProductLoading && !producterro) {
      listProducts = Datacategories.categories.data;
  }

  //function for handle updates on the create product form
  const formUpdate = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }
  // creates a new product and adds it to the selected category
  const handlecreateCategory = async (event) => {
    event.preventDefault()
    try {
      const createShopMutation = await createCategory({
        variables: {
          "input": {
            name: newForm.name,
            type:{connect:newForm.type},
            details:newForm.details,
            parent:Number(newForm.parent) || null
          }
        }
      }).then(() => { window.location.reload(); });
      return createShopMutation;
    } catch (e) {
      console.log(e);
    }
  }
console.log("type",newForm.type)
  return (
    <div>
      {showModal && (
        <form className="input-field" onSubmit={handleUpdateProduct}>
          <input className="input-name" type="text" value={modalContent.name} onChange={modalUpdate} name="name" />
          <button type="submit">{t("create")}</button>
        </form>
      )}

      <div className="CinputSetting Create">
        { LoadingType? (
        <div>
          <Placeholder.Paragraph rows={8} />
          <Loader center content="loading" />
        </div>
        ):(
        <form className="inputSetting" onSubmit={handlecreateCategory}>
          <input className="InSetting w100" type="text" placeholder={t("name")} name="name" value={newForm.name} onChange={formUpdate} />
                       <textarea className="InSetting w100" placeholder={t("details")} name="details" value={newForm.details} onChange={formUpdate} />
 <div className="Inputflex">
          </div>
          <Box sx={{ minWidth: 410 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newForm.type}
                name="type"
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
          <div className="inlIne"><h5>{t("Parent")}</h5>    <Toggle checked={content} onChange={setContent} /></div>
        
          { !content && (
          <Box sx={{ minWidth: 410 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newForm.parent}
                name="parent"
                label="Parent Category"
                onChange={formUpdate}
              >
                  {listProducts.map((e) => {
                  return (
                    <MenuItem value={e?.id} >{e?.name === 'Pharmacy' && t("pharmacy") || e?.name === 'Parapharmacy' && t("parapharmacie") || e?.name === 'Clothes' && t("clothes")}</MenuItem>
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

export default AddCategory;
