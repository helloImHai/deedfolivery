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

router.get("/api/get/customer", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM customers WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      // console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/customertodb", (req, res, next) => {
  console.log("Posted");
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO customers(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      //TODO: CHECK IF PERSON ALREADY EXISTS
      if (q_res.rows.length == 0) {
        res.json("Not added");
      } else {
        res.json("Successfully added");
      }
    }
  );
});

/*------------------------------------ MANAGER ------------------------------------ */

router.post("/api/post/managertodb", (req, res, next) => {
  console.log("Posted");
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO managers(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      //TODO: CHECK IF PERSON ALREADY EXISTS
      if (q_res.rows.length == 0) {
        res.json("Not added");
      } else {
        res.json("Successfully added");
      }
    }
  );
});

router.get("/api/get/manager", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM managers WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      // console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

/*------------------------------------ RESTAURANT ------------------------------------ */

router.post("/api/post/restauranttodb", (req, res, next) => {
  console.log("Posted");
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO restaurants(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      //TODO: CHECK IF PERSON ALREADY EXISTS
      if (q_res.rows.length == 0) {
        res.json("Not added");
      } else {
        res.json("Successfully added");
      }
    }
  );
});

router.get("/api/get/restaurant", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM restaurants WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      // console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/restaurantwithpassword", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  pool.query(
    `SELECT * FROM restaurants WHERE username = $1 and password = $2`,
    [username, password],
    (q_err, q_res) => {
      // console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

/*------------------------------------ FOOD ITEMS ------------------------------------ */

router.get("/api/get/fooditems", (req, res) => {
  const rid = req.query.rid;
  pool.query(`SELECT * FROM sells WHERE rid = $1`, [rid], (q_err, q_res) => {
    // console.log(q_res);
    res.json(q_res.rows);
  });
});

router.post("/api/post/fooditemtodb", (req, res, next) => {
  console.log("Posted");
  const values = [
    req.body.rid,
    req.body.iname,
    req.body.price,
    req.body.quota,
    req.body.category,
  ];
  pool.query(
    `INSERT INTO sells(rid, iname, price, quota, category)
              VALUES($1, $2, $3, $4, $5)
              RETURNING (iname)`,
    values,
    (q_err, q_res) => {
      //TODO: CHECK IF PERSON ALREADY EXISTS
      if (q_res.rows.length == 0) {
        res.json("Not added");
      } else {
        res.json("Successfully added");
      }
    }
  );
});

/*------------------------------------ RIDER ------------------------------------ */

router.post("/api/post/ridertodb", (req, res, next) => {
  console.log("Posted");
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO riders(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      //TODO: CHECK IF PERSON ALREADY EXISTS
      if (q_res.rows.length == 0) {
        res.json("Not added");
      } else {
        res.json("Successfully added");
      }
    }
  );
});

router.get("/api/get/rider", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM riders WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      // console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

module.exports = router;
