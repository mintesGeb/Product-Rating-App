const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const getDB = require("../utils/database").getDB;

const secret = "topSecret";

exports.login = async (req, res, next) => {
  try {
    const user = req.body;

    getDB()
      .collection("users")
      .findOne({ username: user.username, password: user.password })
      .then((data) => {
        if (data) {
          if (data.status === "inactive") {
            res.json(
              "Your account is inactive, please contact us at please@help.me"
            );
          } else if (data.status === "active") {
            const token = jwt.sign(
              { username: data.username, role: data.role },
              secret
            );
            res.json({ token });
          }
        } else {
          res.status(200).json({ error: "invalid username or password" });
        }
      });
  } catch (err) {
    next(err);
  }
};

exports.authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "forbidden" });
      }
      // console.log("authorized", user);
      req.user = user;

      next();
    });
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  // console.log(req.user);
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "forbidden" });
  }
};
