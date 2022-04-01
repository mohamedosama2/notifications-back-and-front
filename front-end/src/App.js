import "./App.css";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useState, useEffect } from "react";
import axios from "axios";

const firebaseConfig = {
  apiKey: " ",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

initializeApp(firebaseConfig);

function App() {
  const [token, setToken] = useState();
  async function getFCMToken() {
    const messaging = getMessaging();

    try {
      // Don't forget to paste your VAPID key here
      // (you can find it in the Console too)
      const token = await getToken(messaging, {
        vapidKey:
          "",
      });

      setToken(token);
      
      return token;
    } catch (e) {
      console.log("getFCMToken error", e);
      return undefined;
    }
  }

  useEffect(() => {
    getFCMToken();
  }, []);
  return (
    <div className="App">
      <p>{token}</p>
      <button
        onClick={async () => {
          console.log("Send");
          await axios.post("http://localhost:4000/getToken", {
            token,
          });
        }}
      >
        Send Notification
      </button>
    </div>
  );
}

export default App;
