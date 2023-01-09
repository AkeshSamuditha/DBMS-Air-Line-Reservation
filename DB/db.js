var mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

const dbSettings = {
    connectionLimit: Number.parseInt(process.env.DB_CONNECTIONLIMIT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
}

var pool  = mysql.createPool(dbSettings);

function executeSQL(sql,placeholder){
    return new Promise((res,rej)=>{
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
           
            // Use the connection
            connection.query(sql,placeholder, async (error, results, fields)=> {

                // When done with the connection, release it.
                connection.release();
            
                // Handle error after the release.
                if (error){
                    rej({error});
                }
                res(results);
            
                // Don't use the connection here, it has been returned to the pool.
            });
          });
    });
}

module.exports = {executeSQL};
