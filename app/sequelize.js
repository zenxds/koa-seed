const Sequelize = require('sequelize')
const config = require('config')
const dbConfig = config.get('mysql')

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
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