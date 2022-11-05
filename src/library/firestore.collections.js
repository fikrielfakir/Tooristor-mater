import {collection} from  'firebase/firestore'
import { db } from './init-firebase'


export  const   visitsCollectionRef = collection(db, 'product')