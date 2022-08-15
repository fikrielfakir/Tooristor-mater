import React, { useState } from "react";
import { GET_SHOPS } from "../../../../components/GraphQL/shops.graphql";
import { CREATE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { UPDATE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { DELETE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/AdminProducts.css";


function AdminProducts() {

  const [deleteShop] = useMutation(DELETE_SHOP);
  const [createShop,{ loading:AddshopsLoading, error:AddshopsError, data:AddshopsData }] = useMutation(CREATE_SHOP);
  if (AddshopsLoading) return "Loading...";
  if (AddshopsError) return `Error! ${error.message}`;

  // sets state for new product form to false so it does not render on load up

  const [showForm, setShowForm] = useState(true);
  const [newForm, setNewForm] = useState({ name: ''})
  // Display all products
  // iterates over the list of products and creates a link to the single product page
  //shows image, name, price, and add to cart button
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [updateShop,{ loading:UpshopsLoading, error:UpshopsError, data:UpshopsData }] = useMutation(UPDATE_SHOP);
  if (UpshopsLoading) return "Loading...";
  if (UpshopsError) return `Error! ${error.message}`;

  let shopList;
  const { loading:shopsLoading, error:shopsError, data:shopsData } = useQuery(GET_SHOPS, {pollInterval: 1000});
  if (shopsLoading) return "Loading...";
  if (shopsError) return `Error! ${error.message}`;
  if (!shopsLoading && !shopsError) {
    shopList = shopsData.shops.data;
  }

  // allows admin to update the item information on the admin page 
  const handleUpdateProduct = async(event) =>{
    event.preventDefault();
    try{
      const updatingShop = await updateShop({
        variables: {
             id: modalContent.id,
            "input":{
          name: modalContent.name,
          }
        },
      });
      return updatingShop;
    }
    catch(e){
      console.log(e);
    }
  };

  // function to populate the modal when you click on a line
  const setContent=(event)=>{
    // console.log(event.target.parentNode.dataset.index);
    // console.log(shopList[event.target.parentNode.dataset.index]);
    setModalContent({...shopList[event.target.parentNode.dataset.index]})
    modalTrigger();
 }

 // function to update the row info through the modal
  const modalUpdate = (event) =>{
    setModalContent({...modalContent, [event.target.name]: event.target.value})
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
    setNewForm({...newForm, [event.target.name]: event.target.value})
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
    try{
      const deleteMutation = await deleteShop ({
        variables: { id: clickID }
      });
      return deleteMutation;
    } catch (e) {
      console.log(e);
    }
    
  }

  // creates a new product and adds it to the selected category
  const handleCreateProduct = async () => {
    try{
      const createShopMutation = await createShop ({
        variables:{
         "input": { name: newForm.name}  }
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
            <input  className="input-name" type="text" value={modalContent.name} onChange={modalUpdate} name="name"/>
            <button type="submit">Create</button>
        </form>
      )}
      {showForm && (
        <form className="input-field" onSubmit={handleCreateProduct}> 
            <input  className="input-name" type="text" value={newForm.name} onChange={formUpdate} name="name" placeholder="name"/>
            <button type="submit">Create</button>
        </form>
      )}
      {/* Spreadsheet Labels */}
      <div className="admin-product">
        <div className="admin-product-list">
          <h3 className="admin-product-item admin-product-item-label">Name</h3>
          <h3
            className="admin-product-item admin-product-item-label"
            id="addProduct" onClick={openForm}
          >
            +
          </h3>
        </div>
        {/* Spreadsheet content  */}
        {shopList.map((shop, index) => {
          return (
            <div className="admin-product-list" key={shop.id} data-index={index} >
              <p className="admin-product-item" id="productname" onClick={setContent}>
                {shop.name}
              </p>
              <p className="admin-product-item" id={shop.id} onClick={deleteAlert}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminProducts;
