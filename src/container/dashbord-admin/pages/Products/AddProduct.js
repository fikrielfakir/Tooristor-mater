import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GET_TYPES } from './../../../../components/GraphQL/type.graphql';
import { GET_SHOPS } from './../../../../components/GraphQL/shops.graphql';
import { GET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from './../../../../components/GraphQL/products.graphql';
import BoxSelect from './../../../../components/UI/BoxSelect/index';


function AdminProducts() {
  const { loading: LoadingType, error: ErrorType, data: DataType } = useQuery(GET_TYPES);
  const { loading: LoadingShop, error: Errorshop, data: DataShop } = useQuery(GET_SHOPS);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [createProduct, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_PRODUCT);
  if (AddshopsLoading) return "Loading...";
  if (AddshopsError) return `Error! ${error.message}`;

  // sets state for new product form to false so it does not render on load up

  const [showForm, setShowForm] = useState(true);
  const [newForm, setNewForm] = useState({ name: '', description: '', price: '', unit: '', type_id: '', shop_id: '', status: '', product_type: '', in_stock: '', is_taxable: '' })
  // Display all products
  // iterates over the list of products and creates a link to the single product page
  //shows image, name, price, and add to cart button
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [updateProduct, { loading: UpshopsLoading, error: UpshopsError, data: UpshopsData }] = useMutation(UPDATE_PRODUCT);
  if (UpshopsLoading) return "Loading...";
  if (UpshopsError) return `Error! ${error.message}`;

  let productList;
  const { loading: shopsLoading, error: shopsError, data: shopsData } = useQuery(GET_PRODUCTS, { pollInterval: 1000 });
  if (shopsLoading) return "Loading...";
  if (shopsError) return `Error! ${error.message}`;
  if (!shopsLoading && !shopsError) {
    productList = shopsData.products.data;
  }

  // allows admin to update the item information on the admin page 
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const updatingShop = await updateProduct({
        variables: {
          id: modalContent.id,
          "input": {
            name: modalContent.name,
          }
        },
      });
      return updatingShop;
    }
    catch (e) {
      console.log(e);
    }
  };

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
  // function to open and close to create product modal
  const openForm = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  //function for handle updates on the create product form
  const formUpdate = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value })
  }

  //function to confirm if user would like to delete product
  const deleteAlert = async (event) => {
    event.preventDefault();
    const clickID = event.target.id;
    console.log(clickID);
    let x = window.confirm("are you sure you want to delete this product?");
    if (x) {
      handleDeleteShop(clickID);
    } else {
      return
    }
  }

  // function to delete the target product
  const handleDeleteShop = async (clickID) => {
    try {
      const deleteMutation = await deleteProduct({
        variables: { id: clickID }
      });
      return deleteMutation;
    } catch (e) {
      console.log(e);
    }

  }

  // creates a new product and adds it to the selected category
  const handleCreateProduct = async () => {
    try {
      const createShopMutation = await createProduct({
        variables: {
          "input": {
            name: newForm.name,
            description: newForm.description,
            price: Number(newForm.price),
            unit: newForm.unit,
            shop_id: newForm.shop_id,
            product_type: newForm.product_type || "SIMPLE",
            status: newForm.status || "PUBLISH",
            in_stock: newForm.in_stock || true,
            is_taxable: newForm.is_taxable || false,
            type_id: Number(newForm.type_id)
          }
        }
      })
      return createShopMutation;
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div>
      {showModal && (
        <form className="input-field" onSubmit={handleUpdateProduct}>
          <input className="input-name" type="text" value={modalContent.name} onChange={modalUpdate} name="name" />
          <button type="submit">Create</button>
        </form>
      )}
      {showForm && (
        <div className="CinputSetting Create">
          <form className="inputSetting" onSubmit={handleCreateProduct}>
            <input className="InSetting w100" type="text" placeholder="name" name="name" value={newForm.name} onChange={formUpdate} />
            <textarea className="InSetting w100" placeholder="text" name="description" value={newForm.description} onChange={formUpdate} />
            <div className="Inputflex">
              <input className="InSetting w50" type="number" placeholder="price" name="price" value={newForm.price} onChange={formUpdate} />
              <input className="InSetting w50" type="text" placeholder="unit" name="unit" value={newForm.unit} onChange={formUpdate} />
            </div>
            <Box sx={{ minWidth: 410 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type Project</InputLabel>
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
                <InputLabel id="demo-simple-select-label">ٍSelect Shop</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newForm.shop_id}
                  name="shop_id"
                  label="List Shops"
                  onChange={formUpdate}
                >
                  {DataShop.shops.data?.map(e => {
                    return (
                      <MenuItem value={e?.id} >{e?.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <div className="validationbutton"><button className="sumbit send" type="submit">Send</button><button className="sumbit cancel" type="Cancel">Cancel</button></div>
          </form>
        </div>
      )}
      {/* Spreadsheet Labels */}
      <div className="admin-product">


      </div>
    </div>
  );
}

export default AdminProducts;
