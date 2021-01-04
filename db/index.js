const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'socials2',
    password: 'grupa1',
    port: 5432,
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
            .then(res => {
                return res;
            });
    }
}