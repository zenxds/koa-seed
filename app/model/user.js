const Sequelize = require('sequelize')
const sequelize = require('../service/sequelize')

// http://sequelize.readthedocs.io/en/latest/docs/models-definition/
// STRING TEXT INTEGER DATE DATEONLY BOOLEAN
// type, allowNull, defaultValue, unique, autoIncrement, primaryKey

/*
 * 用户表
 */
const User = sequelize.define('user', {

},  {
  freezeTableName: true
})

User.sync().then(function () {
  console.log('User sync')
})

module.exports = User
