import React, { useState,useEffect  } from "react";
import { message } from 'antd';
import { GET_SHOPS,DISPROVE_SHOP,APPROVE_SHOP } from "../../../../components/GraphQL/shops.graphql";
import { GET_TYPES } from "../../../../components/GraphQL/type.graphql";
import { CREATE_SHOP, UPDATE_SHOP, DELETE_SHOP, GET_SHOP} from "../../../../components/GraphQL/shops.graphql";
import { UPLOAD_MUTATE } from "../../../../components/GraphQL/upload.graphql";
import ItemView from "./../../components/UI DASHBORD/ItemView"
import { Drawer, Button, Modal, Loader} from 'rsuite';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation } from "@apollo/client";
import RemindIcon from '@rsuite/icons/legacy/Remind';
import AddShop from "./AddProject"
import EdditShop from './EdditProject ';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const {t} = useTranslation();
  const [edit, setEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [view, setview] = React.useState(false);
  const [disprov, setdisProv] = React.useState(false);
  const handleCloseprov = () => setdisProv(false);



  const handleClose = () => setOpen(false);

  const [placement, setPlacement] = React.useState();

  const handleOpen = key => {
    setOpen(true);
    setPlacement(key);
  };
  const handleview = key => {
    setview(true);
    setPlacement(key);
  };
  const handleEdit = key => {
    setEdit(true);
    setPlacement(key);
};


  // sets state for new product form to false so it does not render on load up
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [checked, setChecked] = React.useState(true);


  // Hooks at the top -----------------------------------------------------

  // Query 
  // const { loading: loadingShop, error: errorShop, data: dataShop } = useQuery(GET_SHOP, {
  //   variables: { id_shop },
  // });
  const { loading: Typeloading, error: TypeError, data: TypeData } = useQuery(GET_TYPES);
  const { loading: shopsLoading, error: shopsError, data: shopsData } = useQuery(GET_SHOPS, { pollInterval: 1000 });

  // Mutation  
  const [approveShop,{ loading:AsproveLoading, error: AsproveError, data: dataAsprove }] = useMutation(APPROVE_SHOP);
  const [disApproveShop,{ loading:disproveLoading, error: disproveError, data: datadisdisprove }] = useMutation(DISPROVE_SHOP);

  const [upload, { data }] = useMutation(UPLOAD_MUTATE);
  const [deleteShop, { loading: deleteLoading, error: deleteError, data: deleteData, success: deletesuccess }] = useMutation(DELETE_SHOP);
  const [createShop, { loading: AddshopsLoading, error: AddshopsError, data: AddshopsData }] = useMutation(CREATE_SHOP);
  const [updateShop, { loading: UpshopsLoading, error: UpshopsError, data: UpshopsData, success: upSuccess }] = useMutation(UPDATE_SHOP);
  // --------------------------------------------------------------------------

  // Rendering logic-----------------------------------------------------------

  // LOADING 
  if (AddshopsLoading || Typeloading || UpshopsLoading || shopsLoading) return  <Loader size="lg" />;
  const handprov = (event, id) => {
    setdisProv(true);
    const clickID = id
    handleDisprovedshop(clickID)
  }
if (disproveError || disproveError) {
  message.error({
    content: disproveError.message || disproveError.message
  });
}
if (disproveLoading || AsproveLoading) {
  message.loading({
    content: 'Loading...'
  });
}
if (datadisdisprove || dataAsprove){
  message.success({
    content: 'Disapprove success!',
    duration:2,
  });
}

  // ERROR
  if (AddshopsError) return `Error! ${AddshopsError.message}`;
  if (TypeError) return `Error! ${TypeError.message}`;
  if (UpshopsError) return `Error! ${UpshopsError.message}`;
  //-----------------------------------------------------------------------------


  let shopList;

  if (shopsError) return `Error! ${shopsError.message}`;
  if (!shopsLoading && !shopsError) {
    shopList = shopsData.shops.data;
  }

  // function to populate the modal when you click on a line
  const setContent = (e, index) => {
    e.persist()
    console.log(e)
    setModalContent({ ...shopList[index] })
    handleEdit('right');
  }
  const setshow = (e, index) => {
    e.persist()
   
    setModalContent({ ...shopList[index] })
    handleview('right');
  } 
  console.log("idshop", modalContent)
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

  //function to confirm if user would like to delete product
  const deleteAlert = async (event, id) => {
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
      }).then(() => { window.location.reload(); });
      return deleteMutation;
    } catch (e) {
      console.log(e);
    }

  }

  // creates a new product and adds it to the selected category
  const handleDisprovedshop = async (clickID) => {
    try {
      const disprovedshop = await disApproveShop({
        variables: {
          disApproveShopId:Number(clickID)
        }
      }).then(() => {setdisProv(false)});
      return disprovedshop;
    } catch (e) {
      console.log(e);
    }
  }
  // creates a new product and adds it to the selected category
  const handleAprove = async (e, id) => {
    e.preventDefault();
    try {
      const aprovedshop = await approveShop({
        variables: {
          "input": {
            id: id,
            admin_commission_rate: 10
          }
        }
      })
      console.log("Id", id)
      return aprovedshop;
    } catch (e) {
      console.log(e);
    }
  }

  const handleToggleSwitch = (e, index) => {
    e.persist()
    console.log(e)
    setChecked({ ...shopList[index] });
  };

  console.log("actvive",modalContent?.workhours )

 
  return (
    <>
      <div className="contentOverview">
        <div className="toolbar">
          <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
            <div className="d-flex align-items-start flex-wrap me-2 headAdd"><div className="text-dark fw-bolder my-1 fs-2">{t("shops")}</div><button className="addNew" onClick={() => handleOpen('right')}>{t("Add_New")}</button></div>
            <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
          </div>
          {/* <div className="FiltreProduct">
            <select className="FiltreOption"><i></i>
              <option>Filters</option>
              {TypeData.types?.map(e => {
                return (
                  <option>{e?.name}</option>
                );
              })}
            </select></div> */}
        </div>
        <div className="ContentView shop">
          <div className="FeedList">
            <div className="ListItem">
              {shopList.map((shop, index) => {
                return (
                  <div key={shop.id} data-index={index}>
                    <ItemView
                    iconAprove="fad fa-check-square"
                    iconDisaprove="fad fa-exclamation-circle"
                      img={shop?.logo?.original}
                      title={shop?.name}
                      iSkey={shop.id}
                      onAprove={(e) =>handprov(e, shop.id)}
                      onDisaprove={(e) =>handleAprove(e, shop.id)}
                      isActive={shop.is_active}
                      onChangeActive={(e) => handleToggleSwitch(e, index)}
                      onClick={(e) => setshow(e, index)}
                      onClickedit={(e) => setContent(e, index)}
                      editIcon="fas fa-edit"
                      onClickdrop={(e) => deleteAlert(e, shop.id)}
                      DropIcon="fad fa-trash"
                    />    </div>);
              })}
            </div>
          </div>
        </div>

      </div>
      <>
        <Drawer size="md" placement={placement} open={open} onClose={() => setOpen(false)}>
          <Drawer.Header>
            <Drawer.Title>{t("Add_New")}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <AddShop />
          </Drawer.Body>

        </Drawer></>
        <>
        <Drawer size="md" placement={placement} open={view} onClose={() => setview(false)}>
          <Drawer.Header>
            <Drawer.Title>{modalContent?.name}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            <div className="viewdside">
              <div className="Profile logo">
              <img className="logoProfile" src={modalContent?.logo.original} />
              </div>
              <p className="Pdescription">
                {modalContent?.description}
              </p>
              <div className="Padress">
                <li><b>Owner:</b>{modalContent?.owner.name} - {modalContent?.owner.email}</li>
                <li><b>Stafs:</b>{modalContent?.staffs?.name && "None" } - {modalContent?.stafs?.email && "None"}</li>
                <br/>
                <li><b>Adress:</b>{modalContent?.address.street_address}</li>
                <li><b>City: </b>{modalContent?.address.city}</li>
                <li><b>State: </b>{modalContent?.address.state}</li>
                <br/>
                <h5>Workhours</h5>
             
                <> 
              

                  <h6>Monday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.monday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.monday[0].To} </p>
                  </div>
                  <h6>Tuesday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.tuesday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.tuesday[0].To} </p>
                  </div>
                  <h6>Wednesday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.wednesday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.wednesday[0].To} </p>
                  </div>
                  <h6>Thursday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.thursday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.thursday[0].To} </p>
                  </div>
                  <h6>Friday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.friday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.friday[0].To} </p>
                  </div>
                  <h6>Saturday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.saturday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.saturday[0].To} </p>
                  </div>
                  <h6>Sunday</h6>
                  <div className="Inputflex">
                    <p><b>Form :</b>{modalContent?.workhours?.sunday[0].From} </p>
                    <p><b>To :</b>{modalContent?.workhours?.sunday[0].To} </p>
                  </div>
                </>
              </div>

              <></>
            </div>
          </Drawer.Body>

        </Drawer></>

        <>
                <Drawer size="md" placement={placement} open={edit} onClose={() => setEdit(false)}>
                    <Drawer.Header>
                        <Drawer.Title>Eddit Shop</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <EdditShop
                        modle={modalContent}
                        id={modalContent?.id}
                        gallery={modalContent?.cover_image?.map(i => {
                          return (i.original)
                        })}
                        workhours ={modalContent?.workhours}
                        modalUpdate={modalUpdate}
                        name={modalContent?.name}
                        owner={modalContent?.owner_id}
                        description={modalContent?.description}
                        type={modalContent?.type}
                        valueCity={modalContent?.address?.city}
                        valueday={modalContent?.workhours}
                        
                        />
                    </Drawer.Body>

                </Drawer>
            </>

            <Modal backdrop="static" role="alertdialog" open={disprov} onClose={handleCloseprov} size="xs">
        <Modal.Body>
         <h5>  <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} /> Attension</h5>
          <br/>
          Once a Shop is disproved, the members can't be access to  products
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  )
}
export default Projects