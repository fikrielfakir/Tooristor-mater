import React, { useState } from "react";
import FeedProjects from "../../components/FeedProjects";
import { GET_SHOPS } from "../../../../components/GraphQL/shops.graphql";
import { GET_TYPES } from "../../../../components/GraphQL/type.graphql";
import { CREATE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { UPDATE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { DELETE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { UPLOAD } from "../../../../components/GraphQL/upload.graphql";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation } from "@apollo/client";
import InputFrom from './../../components/InputForm';
import Additeminput from './../../components/Additeminput';

const Projects = () => {
  const { loading:Typeloading, error:TypeError, data:TypeData } = useQuery(GET_TYPES);
  const [ImageSelected, setImageSelected] = useState(null);
  const [upload, { data }] = useMutation(UPLOAD);
  
  const [deleteShop, { loading: deleteLoading, error: deleteError, data: deleteData ,success:deletesuccess }] = useMutation(DELETE_SHOP);
  const [createShop, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_SHOP);
  if (deletesuccess) return "shop it deleted";
  if (AddshopsLoading) return "Loading...";
  if (AddshopsError) return `Error! ${error.message}`;

  // sets state for new product form to false so it does not render on load up

  const [showForm, setShowForm] = useState(false);
  const [newForm, setNewForm] = useState({ name: '',logo:'',description:'' })
  // Display all products
  // iterates over the list of products and creates a link to the single product page
  //shows image, name, price, and add to cart button
  const [showModal, setShowModal] = useState(false);
  const [showView, setShowView] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [updateShop, { loading: UpshopsLoading, error: UpshopsError, data: UpshopsData, success:upSuccess }] = useMutation(UPDATE_SHOP);
  if (UpshopsLoading) return "Loading...";

  if (UpshopsError) return `Error! ${error.message}`;

  let shopList;
  const { loading: shopsLoading, error: shopsError, data: shopsData } = useQuery(GET_SHOPS, { pollInterval: 1000 });
  if (shopsLoading) return "Loading...";
  if (shopsError) return `Error! ${error.message}`;
  if (!shopsLoading && !shopsError) {
    shopList = shopsData.shops.data;
  }

  // allows admin to update the item information on the admin page 
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const updatingShop = await updateShop({
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
  const setContent=(e, index)=>{
    e.persist()
    console.log(e)
    setModalContent({...shopList[index]})
    modalTrigger();
 }
  const setView=(e, index)=>{
    e.persist()
    console.log(e)
    setModalContent({...shopList[index]})
    viewsform();
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
  // function to open and close view shops
  const viewsform = () => {
    if (showView) {
      setShowView(false);
    } else {
      setShowView(true);
    }
  };
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
  const deleteAlert = async (event,id) => {
    event.preventDefault();
    const clickID = id;
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
      const deleteMutation = await deleteShop({
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
      const createShopMutation = await  createShop({
        variables: {
          "input": { name: newForm.name , description:newForm.description}
        }
      })
      return createShopMutation;
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className="content fs-6 d-flex flex-column flex-column-fluid">
      <div className="toolbar">
        <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
          <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">Projects</div><button className="addNew" onClick={openForm}>Add new</button></div>
          <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
        </div>
        <div className="FiltreProduct">
          <select className="FiltreOption"><i></i>
          <option>Filters</option>
          {TypeData.types?.map(e=>{
       return (
          <option>{e?.name}</option>
          );
        })}
        </select></div>
      </div>
      <div className="ContentView">
        <div className="FeedList">
          <div className="ListItem">
            <div className='TitleList'></div>
            {shopList.map((shop, index) => {
              return (
                <div key={shop.id} data-index={index}>

                  <div className="BarreItem">
                    <div className="headitem" >
                      <div className='imgView'><img src={shop.logo.original} alt={shop.name} /></div>
                      <div className='titleView'>{shop.name}</div></div>
                    <div className="controlpost">
                      <a><i class="fas fa-edit"  key={shop.id} onClick={(e) => setContent(e, index)}></i></a>
                      <a><i class="fas fa-toggle-on"></i></a>
                      <a onClick={(e) => deleteAlert(e, shop.id)}><i class="fad fa-trash"></i></a>
                      <a className="viewmore" key={shop.id} onClick={(e) => setView(e, index)}><i class="fas fa-chevron-right"></i></a></div>
                  </div>
                </div>);
            })}
          </div>
        </div>
        {showView && (
          <div className="FeedProjects" key={modalContent.id} >
            <FeedProjects
              name={modalContent.name}
              description={modalContent.description}
            />
          </div>)}
        {showModal && (
          <div className="FeedProjects" key={modalContent.id} >
            <InputFrom
        name="name"
        description={modalContent.description}
        value={modalContent.name}
        onChange={modalUpdate}
            />
          </div>)}
          {showForm && (
          <div className="FeedProjects">
            <Additeminput
              onSubmit={handleCreateProduct}
              nameName="name"
              nameDes="description"
              nameFile="logo"
              valuename={newForm.name}
              valuedesc={newForm.description}
              onChange={formUpdate}
              onChangeFile={(e) => setImageSelected(e.target.original[0])}
            
            />
          </div>)}

      </div>
    </div>
  )
}
export default Projects