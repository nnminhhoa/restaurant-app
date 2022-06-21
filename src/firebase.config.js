import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCls6GCWNC0tahOVO03e7Y_5s2cV8rIU8E',
  authDomain: 'restaurant-abad8.firebaseapp.com',
  databaseURL: 'https://restaurant-abad8-default-rtdb.firebaseio.com',
  projectId: 'restaurant-abad8',
  storageBucket: 'restaurant-abad8.appspot.com',
  messagingSenderId: '674729349458',
  appId: '1:674729349458:web:0da4ee871b94e29bbdea8b',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
