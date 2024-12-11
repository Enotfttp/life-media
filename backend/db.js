const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5433',
    database: 'life-media'
})


module.exports = pool