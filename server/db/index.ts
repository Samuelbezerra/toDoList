const Pool = require("pg").Pool;



module.exports = new Pool({
    user: "postgres",
    password: "samuel",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});