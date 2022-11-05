import React, { useEffect, useState } from "react";
// import ListMessages from "../../components/ListMessages"
// import FeedMessage from "../../components/FeedMessage"
import { message } from 'antd';
import ItemView from './../../components/UI DASHBORD/ItemView'
// import { collection, getDocs, addDoc, collectionGroup } from 'firebase/firestore';
// import { db } from './../../../../library/init-firebase';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite';
import avatar from "./default.png"
import empty from "./empty.svg"
import MessageDataService from "./services"
import { useTranslation } from 'react-i18next';



const Messages = () => {
  const {t} = useTranslation();
  const [message, setMessage] = useState([]);
  const [placement, setPlacement] = React.useState();
  const [view, setview] = React.useState(false);
  const [messageID, serMessageID] = useState("");
  const [modalContent, setModalContent] = React.useState();




  useEffect(() => {
    getVisits()
  }, [])

  useEffect(() => {
    console.log(message)
  }, [message])


  const getVisits = async () => {
    const data = await MessageDataService.getAllBooks();
    console.log("MEssage", data.docs);
    setMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log("All Message", message.length)
  const handleview = key => {
    setview(true);
    setPlacement(key);
  };
  const getBookId = (id) => {
    console.log("The ID of document to be edited: ", id);
    serMessageID(id);
  };
  const setshow = async (e, id) => {
    e.persist()
    const data = await MessageDataService.getBook(id);
    setModalContent(data._document.data.value.mapValue.fields);
    handleview('right');
  }
  const deleteHandler = async (id) => {
    await MessageDataService.deleteBook(id);
    getVisits();
    message.success('Message deleted')
  };


  console.log("RESULT ID", modalContent);
  return (
    <>
      <div className="contentOverview">
        <div className="toolbar">
          <div className="container-fluid d-flex flex-stack flex-wrap flex-sm-nowrap">
            <div className="d-flex flex-column align-items-start justify-content-center flex-wrap me-2"><div className="text-dark fw-bolder my-1 fs-2">{t("messages")}</div></div>
            <div className="d-flex align-items-center flex-nowrap text-nowrap py-1"></div>
          </div>
          {/* <div className="FiltreProduct"><select className="FiltreOption"><i></i>
            <option>Filters</option>
          </select></div> */}
        </div>
        <div className="ContentView">


          <div className="ListItem" style={{ width: "100%" }}>
            {message?.map((e, index) => {
              return (
                <ItemView
                  img={avatar}
                  title={e?.firstname}
                  IconMore="SED"
                  onClickdrop={(event) => deleteHandler(e?.id)}
                  DropIcon="fad fa-trash"
                  onClick={(event) => setshow(event, e?.id)}
                />
              );
            })}
            {  message.length == 0 && (
              <div className="nobox">
                <img src={empty} />
                <h5>{t("Mailbox")} {t("Empty")}</h5>
              </div>
            )}

          </div>


        </div>
      </div>

      <Drawer size="md" placement={placement} open={view} onClose={() => setview(false)}>
        <Drawer.Header>
          <Drawer.Title>{t("messages")}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <div className="viewdside">
            <div className="Profile logo">
              <img className="logoProfile" src={avatar} />
            </div>
            <ul className="bodyMessage">
              <li><p>First Name</p>:<p>{modalContent?.firstname?.stringValue}</p></li>
              <li><p>Last Name</p>:<p>{modalContent?.lastname?.stringValue}</p></li>
              <>
              {modalContent?.subject? ( <li><p>Subject</p>:<p>{modalContent?.subject?.stringValue}</p></li>):(
              <>
              <li><p>Project Name</p>:<p>{modalContent?.project?.stringValue}</p></li>
              <li><p>Prject Adress</p>:<p>{modalContent?.adresse?.stringValue}</p></li>
              <li><p>Caterogy</p>:<p>{modalContent?.category?.stringValue}</p></li>
              <li><p>CIN</p>:<p>{modalContent?.cin?.stringValue}</p></li>
              <li><p>Phone</p>:<p>{modalContent?.phone?.stringValue}</p></li>
              </>
              )}
              </>
              <li><p>Email</p>:<p>{modalContent?.email?.stringValue}</p></li>
              <li><p>Description</p>:<p>{modalContent?.description?.stringValue}</p></li>
            </ul>
          </div>
        </Drawer.Body>

      </Drawer>
    </>
  )
}

export default Messages
