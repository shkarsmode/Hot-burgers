import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
		apiKey: "AIzaSyBTX8asOsRCFSzAf-3t8taC1G9FOuXVrJ8",
		authDomain: "very-hot-burgers-f1c64.firebaseapp.com",
		databaseURL: "https://very-hot-burgers-f1c64-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;