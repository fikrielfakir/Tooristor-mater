import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { collection, addDoc} from 'firebase/firestore';
import { message} from 'antd';
import { db } from "library/init-firebase";


const ContactForm = () => {
  const {t} = useTranslation();
  const [Form, setForm] = useState({firstname:null, lastname:null, email:null, subject:null, description:null});
  const OnForm = (event) => {
    setForm({ ...Form, [event.target.name]: event.target.value }
      ) 
   
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (Form.firstname !== null && Form.lastname !== null  && Form.email !== null && Form.subject !== null&& Form.description !== null ){
    const visitsCollectionRefs = collection(db, 'contact')
    addDoc(visitsCollectionRefs, Form)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
    message.loading('Please Wait').then(() => { message.success(t("sent_success")) && history.push(`/`); }); }
    else{
      message.error("Review your request, you may have forgotten to include a field")
    }
  }
  console.log("contact",)
  return (
    <form className='FromContact' onSubmit={handleSubmit}>
      <div className='InputLine'>
        <input  type="text" onChange={OnForm} name="firstname" value={Form.firstname} placeholder={t("First_name")}/>
        <input type="text" onChange={OnForm}  name="lastname"  value={Form.lastname} placeholder={t("Last_name")}/>
      </div>
      <div className='InputLine'>
        <input type="email" onChange={OnForm} name="email" value={Form.email} placeholder={t("email")}/>
        <input  type="text" onChange={OnForm} name="subject" value={Form.subject} placeholder={t("Subject")}/>
      </div>
      <textarea className="messageform" type="text" onChange={OnForm} name="description" value={Form.description} placeholder={t("Your_Message")}/>
      <button>{t("Send")}</button>
    </form>
  )
}
export default ContactForm;
