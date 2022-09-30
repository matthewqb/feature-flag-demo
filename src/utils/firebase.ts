import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Pyq8dsS9t5drWt0N12qBtRQnD3_SKHo",
  authDomain: "feature-flag-demo-a6978.firebaseapp.com",
  projectId: "feature-flag-demo-a6978",
  storageBucket: "feature-flag-demo-a6978.appspot.com",
  messagingSenderId: "44266211814",
  appId: "1:44266211814:web:88fe7dc0a2420395bdae27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Remote Config and get a reference to the service
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 1000;

export { app, remoteConfig };
