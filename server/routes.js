var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/api/hello", (req, res) => {
  res.json("hello everybody");
});

/*------------------------------------ CUSTOMER ------------------------------------ */

router.get("/api/get/allcustomers", (req, res) => {
  pool.query(`SELECT * FROM customers`, (q_err, q_res) => {
    // console.log(q_res);
    res.json(q_res.rows);
  });
});

router.post("/api/post/customertodb", (req, res, next) => {
  console.log("Posted");
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO customers(username, password)
              VALUES($1, $2)
              ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      //TODO: CHECK IF PERSON ALREADY EXISTS
      res.json("Successfully added");
    }
  );
});

module.exports = router;
