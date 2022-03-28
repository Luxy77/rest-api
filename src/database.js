const mysql = require('mysql');
const { promisify } = require('util');

const mysqlConnection = mysql.createPool({
    host: '127.0.0.1',
    user:'root',
    password:'Klmnñopq690.',
    database:'library'
});
  
mysqlConnection.getConnection((err, connection)=>{
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON__COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }   
    }
    

    if(connection) connection.release();
        console.log('DB is Connected');
        return;
});

mysqlConnection.query = promisify(mysqlConnection.query)

module.exports = mysqlConnection;