const mysql =  require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"legal2002",
    database: "streamconnect"

})

module.exports = connection;