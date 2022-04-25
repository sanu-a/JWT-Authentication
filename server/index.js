const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sanua*123",
  database: "authentication",
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const query = "select * from users where user_name=? and password=?";
  db.query(query, [userName, password], (err, result) => {
    if (err) res.status(500).send("Server error");
    if (result.length > 0) {
      res.status(200).send("login successful");
    } else {
      res.send("Please check username/password");
    }
  });
});

app.post("/signup", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const query1 = "select * from users where user_name=?";
  db.query(query1, userName, (err, result) => {
    if (err) res.status(500).send("Server error");
    if (result.length > 0) {
      res.send("User name already exist!!");
    } else {
      const query2 = "insert into users (user_name, password) values(?,?)";
      db.query(query2, [userName, password], (err, result) => {
        if (err) res.status(500).send("Server error");
        res.status(200).send("Sign up successful");
      });
    }
  });
});

app.listen(8008, () => {
  console.log("server started on 8008");
});
