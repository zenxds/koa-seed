// http://docs.sequelizejs.com/manual/tutorial/models-definition.html
// STRING TEXT INTEGER DATE DATEONLY BOOLEAN
// type, allowNull, defaultValue, unique, autoIncrement, primaryKey

module.exports = function(db, DataTypes) {
  /*
   * 用户表
   */
  const User = db.define(
    'user',
    {
      name: DataTypes.STRING
    },
    {
      freezeTableName: true,
      // 逻辑删除
      paranoid: true
    }
  )

  User.associate = function(models) {}

  return User
}
