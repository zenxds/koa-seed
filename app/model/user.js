const Sequelize = require('sequelize')
const sequelize = require('../service/sequelize')

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
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
