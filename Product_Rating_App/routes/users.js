var express = require("express");
var router = express.Router();
let getDB = require("../utils/database").getDB;
let authConroller = require("../controller/authController");

/* GET users listing. */

router.get("/", authConroller.authorizeAdmin, function (req, res, next) {
  let user1 = getDB().collection("users").find().toArray();
  user1.then((data) => {
    res.json(data);
  });
});

router.get(
  "/:username",
  authConroller.authorizeAdmin,
  function (req, res, next) {
    let user1 = getDB()
      .collection("users")
      .findOne({ username: req.params.username });
    user1.then((data) => {
      if (!data) {
        res.json("no data");
      }
      res.json(data);
    });
  }
);

router.post("/", authConroller.authorizeAdmin, function (req, res, next) {
  let userToInsert = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    review: [],
  };
  getDB()
    .collection("users")
    .insertOne(userToInsert)
    .then((data) => {
      res.json(data);
    });
});

router.put(
  "/:username",
  authConroller.authorizeAdmin,
  function (req, res, next) {
    console.log(req.body);
    getDB()
      .collection("users")
      .updateOne({ username: req.params.username }, { $set: req.body })
      .then((data) => {
        res.json(data);
      });
  }
);

router.delete(
  "/:username",
  authConroller.authorizeAdmin,
  function (req, res, next) {
    getDB()
      .collection("users")
      .remove({ username: req.params.username })
      .then((data) => {
        res.json(data);
      });
  }
);

module.exports = router;
