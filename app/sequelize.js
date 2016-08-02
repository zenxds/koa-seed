const Sequelize = require('sequelize')
const config = require('config')
const dbConfig = config.get('db')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
})

sequelize
.authenticate()
.then(function() {
    console.log('DB Connection has been established successfully.')
})
.catch(function (err) {
    console.log('Unable to connect to DB:', err)
})

module.exports = sequelize