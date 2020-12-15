import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};

firebase.initializeApp(config);
firebase.firestore();

const getUserRowset = () => {
  var res = {};
  var db = firebase.firestore()
  db.collection("users").get().then((query) => {
    var buff = [];
    query.forEach((doc) => {
      var data = doc.data();
      buff.push([doc.id, data.name, data.age]);
      res[doc.id] = data;
    });
  }).catch((error)=>{
    console.log(`データの取得に失敗しました (${error})`);
  });
  return res;

}

export default getUserRowset;
