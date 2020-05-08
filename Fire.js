import firebase from "firebase";
import "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDMDQnp7k9-GHVFKOmSFs_MVCDLzC3ND4M",
  authDomain: "todoapp-22de0.firebaseapp.com",
  databaseURL: "https://todoapp-22de0.firebaseio.com",
  projectId: "todoapp-22de0",
  storageBucket: "todoapp-22de0.appspot.com",
  messagingSenderId: "1087628507803",
  appId: "1:1087628507803:web:0de5b0c095d32adc83e43e",
};

class Fire {
  constructor(callback) {
    //alert(this.init(callback));
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((err) => {
            callback(err);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
