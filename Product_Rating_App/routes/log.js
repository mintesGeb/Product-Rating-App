const express = require("express");
const router = express.Router();
const getDB = require("../utils/database").getDB;
const authConroller = require("../controller/authController");
const ObjectId = require("../utils/database").ObjectId;

router.use("/", (req, res, next) => {
  //   console.log("log", req.method, req.url, req.user, req.statusMessage);

  let insertToLog = {
    user: [req.user.username, req.user.role],
    url: req.url,
    method: req.method,
    createdAt: Date.now(),
  };
  getDB().collection("log").insertOne(insertToLog);
  next();
});

router.get("/log", authConroller.authorizeAdmin, (req, res, next) => {
  console.log(req.query.id);
  if (req.query.id) {
    const objID = new ObjectId(req.query.id);
    console.log(objID);

    getDB()
      .collection("log")
      .findOne({ _id: objID })
      .then((data) => {
        res.json(data);
      });
    // res.json("coming up");
  } else {
    getDB()
      .collection("log")
      .find()
      .toArray()
      .then((data) => {
        res.json(data);
      });
  }
});

// router.get("/log:id", authConroller.authorizeAdmin, (req, res, next) => {
//   console.log(req.params.id);
//   const objID = new ObjectId(req.params.id);

//   getDB()
//     .collection("log")
//     .findOne({ _id: objID })
//     .then((data) => {
//       res.json(data);
//     });
// });

module.exports = router;
