var express = require("express");
var router = express.Router();
var pool = require("./db");

router.post("/api/posts/customertodb", (req, res, next) => {
  const values = [req.body.profile.username, req.body.profile.password];
  pool.query(
    `INSERT INTO users(username, password)
              VALUES($1, $2)
              ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

// Retrieve another users profile from db based on username
router.get("/api/get/otheruserprofilefromdb", (req, res, next) => {
  // const email = [ "%" + req.query.email + "%"]
  const username = String(req.query.username);
  pool.query(
    `SELECT * FROM users
              WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});
