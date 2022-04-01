const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const adminConfig = {
  projectId: process.env.projectId,
  privateKey: process.env.privateKey.replace(/\\n/g, "\n"),
  clientEmail: process.env.clientEmail,
};
// Initialize the firebase admin app
admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://xxxxx.firebaseio.com",
});
app.post("/getToken", async (req, res) => {
  console.log("Sending");
  /*   console.log("Token", req.body.token); */
  try {
    await admin.messaging().send({
      /*     notification: Notification, */
      webpush: {
        notification: {
          title: "Hello",
          timestamp: true,
          body: "asdas",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
          image:
            "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80",
          actions: [
            {
              action: "open",
              title: "Lato",
              icon: "https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png",
            },
            {
              action: "cancel",
              title: "Canel",
              icon: "https://freeiconshop.com/wp-content/uploads/edd/image-outline-filled.png",
            },
          ],
        },
      },
      token: req.body.token,
    });
  } catch (err) {
    console.log("Err");
  }
  console.log("Done");
  res.status(200).json({ message: "Done" });
});

app.listen(4000, () => {
  console.log("Server is listening on", 4000);
});
