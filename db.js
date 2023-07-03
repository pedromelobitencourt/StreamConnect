const mysql =  require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"191002",
    database: "streamconnect"

})

module.exports = connection;