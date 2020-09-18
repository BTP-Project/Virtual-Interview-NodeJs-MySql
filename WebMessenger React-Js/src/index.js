import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import { Provider } from 'react-redux'
import store from './store'

const firebaseConfig = {
  apiKey: "AIzaSyB60z9ykJLPXObfsnqwz-EaADL8brjOjgw",
  authDomain: "virtual-interview-d921a.firebaseapp.com",
  databaseURL: "https://virtual-interview-d921a.firebaseio.com",
  projectId: "virtual-interview-d921a",
  storageBucket: "virtual-interview-d921a.appspot.com",
  messagingSenderId: "992819181460",
  appId: "1:992819181460:web:c123d40ed90f6a2a778181",
  measurementId: "G-GN7PP0R69K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
