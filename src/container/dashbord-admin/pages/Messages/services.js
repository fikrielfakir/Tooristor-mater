import { db } from './../../../../library/init-firebase';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const bookCollectionRef = collection(db, 'contact')
class MessageDataService{
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "contact", id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, "contact", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getBook = (id) => {
    const bookDoc = doc(db, "contact", id);
    return getDoc(bookDoc);
  };
}

export default new MessageDataService();