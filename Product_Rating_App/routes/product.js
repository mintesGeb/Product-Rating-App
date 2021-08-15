const express = require("express");
const router = express.Router();
const authConroller = require("../controller/authController");

let getDB = require("../utils/database").getDB;

router.get("/", (req, res, next) => {
  if (!req.query.sort) {
    let product1 = getDB().collection("product").find().toArray();
    product1.then((data) => {
      if (!data) {
        console.log("no data");
      }
      res.json({ data });
    });
  } else {
    if (req.query.sort === "reputation") {
      getDB()
        .collection("product")
        .find()
        .sort({ reputation: 1 })
        .project({ _id: 0, review: 0 })
        .toArray()
        .then((sortedData) => {
          res.json(sortedData);
        });
    } else {
      res.json("no such search query");
    }
  }
});
router.get("/:name", (req, res, next) => {
  let product1 = getDB()
    .collection("product")
    .findOne({ name: req.params.name });
  product1.then((data) => {
    if (!data) {
      res.json("no data");
    }
    res.json({ data });
  });
});

router.post("/", (req, res, next) => {
  let productToInsert = req.body;
  productToInsert.reputation = 0;
  productToInsert.review = [];

  let product1 = getDB().collection("product").insertOne(productToInsert);
  product1.then((data) => {
    if (!data) {
      console.log("no data");
    }
    res.json({ data });
  });
});

router.put("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  let product = getDB()
    .collection("product")
    .updateOne({ name: req.params.name }, { $set: req.body });
  product.then((data) => {
    if (!data) {
      res.json("no data");
    }
    res.json(data);
  });
});

router.delete("/:name", authConroller.authorizeAdmin, (req, res, next) => {
  let productname = req.params.name;
  let product = getDB().collection("product").remove({ name: productname });
  product.then((data) => {
    if (!data) {
      res.json("no such product name in database");
    }
    res.json({ data });
  });
});

module.exports = router;
