import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCbwzn3uk8FWQNgzuXpzPVBpdrJJ9xnwrM',
  authDomain: 'talkative-a3af2.firebaseapp.com',
  projectId: 'talkative-a3af2',
  storageBucket: 'talkative-a3af2.appspot.com',
  messagingSenderId: '1012375719004',
  appId: '1:1012375719004:web:8cd2c373fa69999d3b2a99'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
