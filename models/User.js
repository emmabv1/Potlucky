module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      //userId: {type: DataTypes.INTEGER, autoincrement:true, primaryKey: true},
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      parties: DataTypes.STRING,
    });

  return User;
}