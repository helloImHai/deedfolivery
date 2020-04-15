const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  password: "archeops",
  post: 5432
});

module.exports = pool;
