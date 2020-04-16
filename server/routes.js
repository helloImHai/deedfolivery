var express = require("express");
var router = express.Router();
var pool = require("./db");

router.get("/api/hello", (req, res) => {
  res.json("hello everybody");
});

/*------------------------------------ CUSTOMER ------------------------------------ */

router.get("/api/get/allcustomers", (req, res) => {
  pool.query(`SELECT * FROM customers`, (q_err, q_res) => {
    if (q_err) {
      return res.status(400).send({
        message: q_err.message,
      });
    }
    res.json(q_res.rows);
  });
});

router.get("/api/get/customer", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM customers WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/customertodb", (req, res, next) => {
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO customers(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/custupdatetodb", (req, res, next) => {
  console.log("Posted");
  const values = [
    req.body.cid,
    req.body.custname,
    req.body.address,
    req.body.email,
    req.body.card,
  ];
  console.log(values);
  pool.query(
    `UPDATE customers SET "cname" = $2, "address" = $3, "email" = $4, "card" = $5
              WHERE "cid" = $1`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        return res.status(400).send({
          message: q_err.message,
        });
      }
      if (q_res.rows.length == 0) {
        res.json("Not updated");
      } else {
        res.json("Successfully updated");
      }
    }
  );
});

/*------------------------------------ MANAGER ------------------------------------ */

router.post("/api/post/managertodb", (req, res, next) => {
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO managers(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/managertodb", (req, res) => {
  const { mname, email, password, mid } = req.body;
  pool.query(
    `UPDATE managers SET
    mname = $1, email = $2, password = $3
    where mid = $4
    returning mname;`,
    [mname, email, password, mid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/manager", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM managers WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

/*------------------------------------ RESTAURANT ------------------------------------ */

router.post("/api/post/restauranttodb", (req, res, next) => {
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO restaurants(username, password)
              VALUES($1, $2)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/restauranttodb", (req, res) => {
  const { rname, email, password, address, minspend, rid } = req.body;
  pool.query(
    `UPDATE restaurants SET
    rname = $1, email = $2, password = $3, address = $4, minspend = $5
    where rid = $6
    returning rname;`,
    [rname, email, password, address, minspend, rid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/restaurant", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM restaurants WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
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
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

/*------------------------------------ FOOD ITEMS ------------------------------------ */

router.get("/api/get/fooditemsbyrid", (req, res) => {
  const rid = req.query.rid;
  pool.query(`SELECT * FROM sells WHERE rid = $1`, [rid], (q_err, q_res) => {
    if (q_err) {
      return res.status(400).send({
        message: q_err.message,
      });
    }
    res.json(q_res.rows);
  });
});

router.post("/api/post/fooditemtodb", (req, res, next) => {
  const values = [
    req.body.rid,
    req.body.iname,
    req.body.price,
    req.body.quota,
    req.body.category,
  ];
  pool.query(
    `INSERT INTO sells(rid, item, price, quantity, category)
              VALUES($1, $2, $3, $4, $5)
              RETURNING (item)`,
    values,
    (q_err, q_res) => {
      console.log(q_err);
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      if (q_res.rows.length == 0) {
        res.json("Not added");
      } else {
        res.json("Successfully added");
      }
    }
  );
});

router.delete("/api/delete/fooditembyiid", (req, res) => {
  const values = [req.body.iid];
  pool.query(`DELETE FROM sells where iid = $1`, values, (q_err, q_res) => {
    if (q_err) {
      return res.status(400).send({
        message: q_err.message,
      });
    }
    res.json("Delete successful");
  });
});

/*------------------------------------ RIDER ------------------------------------ */

router.post("/api/post/ridertodb", (req, res, next) => {
  const values = [req.body.username, req.body.password];
  pool.query(
    `INSERT INTO riders(username, password, delivered)
              VALUES($1, $2, 0)
              ON CONFLICT(username) DO NOTHING
              RETURNING (username)`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/ridertodb", (req, res) => {
  const { ridername, email, password, riderid } = req.body;
  pool.query(
    `UPDATE riders SET
    ridername = $1, email = $2, password = $3
    where riderid = $4
    returning ridername;`,
    [ridername, email, password, riderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/updatedelivered", (req, res) => {
  console.log("Put!");
  const { riderid } = req.body;
  pool.query(
    `UPDATE riders SET
    delivered = (SELECT count(*) FROM assigns WHERE riderid = $1 AND deliverytime IS NOT NULL)
    WHERE riderid = $1
    RETURNING ridername;`,
    [riderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/rider", (req, res) => {
  const username = req.query.username;
  pool.query(
    `SELECT * FROM riders WHERE username = $1`,
    [username],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/allriders", (req, res) => {
  pool.query(`SELECT * FROM riders`, (q_err, q_res) => {
    if (q_err) {
      return res.status(400).send({
        message: q_err.message,
      });
    }
    res.json(q_res.rows);
  });
});

/*------------------------------------ ORDER ------------------------------------ */

router.get("/api/get/allpendingorders", (req, res) => {
  pool.query(
    `SELECT * FROM orders
    WHERE oid NOT IN(SELECT oid FROM assigns)`,
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

/*------------------------------------ ASSIGNS ------------------------------------ */

router.get("/api/get/assignedordersbymid", (req, res) => {
  const mid = req.query.mid;
  pool.query(
    `SELECT * FROM assigns
    WHERE mid = $1`,
    [mid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/assignedordersbyriderid", (req, res) => {
  const riderid = req.query.riderid;
  pool.query(
    `SELECT * FROM assigns a, orders o
    WHERE riderid = $1 AND a.oid = o.oid
    ORDER BY accepttime DESC`,
    [riderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/assigntodb", (req, res) => {
  const { rid, oid, mid, managerFee, riderFee } = req.body;
  pool.query(
    `INSERT INTO assigns(riderid, oid, mid, managerFee, riderFee)
    VALUES($1, $2, $3, $4, $5)
    RETURNING (mid);`,
    [rid, oid, mid, managerFee, riderFee],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );

});

router.put("/api/put/accepttime", (req, res) => {
  const { orderid, accepttime } = req.body;
  pool.query(
    `UPDATE assigns SET accepttime = to_timestamp($1 / 1000.0) where oid = $2
    returning accepttime;`,
    [accepttime, orderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/reachedtime", (req, res) => {
  const { orderid, reachedtime } = req.body;
  pool.query(
    `UPDATE assigns SET reachedtime = to_timestamp($1 / 1000.0) where oid = $2
    returning reachedtime;`,
    [reachedtime, orderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/leavetime", (req, res) => {
  const { orderid, leavetime } = req.body;
  pool.query(
    `UPDATE assigns SET leavetime = to_timestamp($1 / 1000.0) where oid = $2
    returning leavetime;`,
    [leavetime, orderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/deliverytime", (req, res) => {
  const { orderid, deliverytime } = req.body;
  pool.query(
    `UPDATE assigns SET deliverytime = to_timestamp($1 / 1000.0) where oid = $2
    returning deliverytime;`,
    [deliverytime, orderid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: q_err.message,
        });
      }
      res.json(q_res.rows);
    }
  );
});

/*------------------------------------ Menu ------------------------------------ */
router.get("/api/get/restaurantName", (req, res) => {
  pool.query(`SELECT rname FROM restaurants`, (q_err, q_res) => {
    if (q_err) {
      return res.status(400).send({
        message: q_err.message,
      });
    }
    res.json(q_res.rows);
  });
});

module.exports = router;

/*------------------------------------ Places ------------------------------------ */
router.get("/api/get/placeitembycid", (req, res) => {
  console.log(req.query);
  const cid = req.query.cid;
  pool.query(`SELECT * FROM places
      INNER JOIN orders
      ON orders.oid = places.oid
      WHERE places.cid = $1;`,[cid], (q_err, q_res) => {
        console.log(q_res);
      if (q_err) {
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
  });
});

router.post("/api/post/placeOrder", (req, res) => {
  const { paytype, card, cost, address} = req.body;
  console.log(req.body);
  pool.query(
    `INSERT INTO orders(oid, paytype, card, cost, reward, address)
      VALUES ((SELECT COUNT(*) from orders) + 1,$1, $2, $3, $4, $5)
      RETURNING(oid)`,
    [paytype, card, cost, Math.round(cost), address],
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/placePlaces", (req, res) => {
  const { custId, orderId } = req.body;
  console.log(req.body);
  pool.query(
    `INSERT INTO places(cid, oid, orderTime)
      VALUES ($1,$2, CURRENT_TIMESTAMP)
      RETURNING(cid)`,
    [custId, orderId],
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.post("/api/post/placeList", (req, res) => {
  const { oid, iid, quantity} = req.body;
  console.log(req.body);
  pool.query(
    `INSERT INTO lists(oid, iid, quantity)
      VALUES ($1,$2, $3)
      RETURNING iid, quantity;`,
    [oid, iid, quantity],
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
    }
  );
});

router.put("/api/put/removeStock", (req, res) => {
  const { quan, iid } = req.body;
  pool.query(
    `UPDATE  sells SET quantity = quantity - $1
    WHERE iid = $2;`,
    [quan, iid],
    (q_err, q_res) => {
      if (q_err) {
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
    }
  );
});


router.get("/api/get/orderNotAssign", (req, res) => {
  pool.query(`SELECT t1.oid, t1.paytype, t1.card, t1.cost, t1.address
      FROM orders t1
      LEFT JOIN assigns t2 ON t2.oid = t1.oid
      WHERE t2.oid IS NULL`, (q_err, q_res) => {
        console.log(q_res);
      if (q_err) {
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
  });
});
/*------------------------------------ Food ------------------------------------ */
router.get("/api/get/foodName", (req, res) => {
  const rname = req.query.rname;
  pool.query(`SELECT * FROM sells
      INNER JOIN restaurants
      ON restaurants.rid = sells.rid
      WHERE restaurants.rname = $1;`,[rname], (q_err, q_res) => {
        console.log(q_res);
      if (q_err) {
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
  });
});

/*------------------------------------ Review ------------------------------------ */
router.post("/api/post/giveReview", (req, res) => {
  const { review, ratings, cid, oid } = req.body;
  console.log(req.body);
  pool.query(`INSERT INTO reviews
    VALUES ($1,$2, $3, $4)`,[cid, oid, review, ratings], (q_err, q_res) => {
        console.log(q_res);
      if (q_err) {
        console.log(q_err);
        return res.status(400).send({
          message: "This is an error!",
        });
      }
      res.json(q_res.rows);
  });
});
