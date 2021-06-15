import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBjLDOaKElAyXV7N4XixvfoFv18o1hefbs",
  authDomain: "cadastro-de-funcionarios-44c05.firebaseapp.com",
  projectId: "cadastro-de-funcionarios-44c05",
  storageBucket: "cadastro-de-funcionarios-44c05.appspot.com",
  messagingSenderId: "285583506513",
  appId: "1:285583506513:web:84b17228efefb191a34c70"
  };



let fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref()