module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      parties: DataTypes.STRING, //[]
    });

  return User;
}