module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model a name of type STRING
      userId: {type: DataTypes.INTEGER, autoincrement:true,primaryKey: true},
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, primaryKey: true },
      password: DataTypes.STRING,
      parties: DataTypes.STRING,
    });
  
  User.associate = function(models) {
   User.hasMany(models.Party,{
   foreignKey:"userId"
    });
   }

  return User;
}