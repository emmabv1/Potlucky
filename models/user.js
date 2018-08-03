module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      //parties: DataTypes.STRING,
    });

//     UserParty.associate = function(models) {
           
//       UserParty.hasOne(models.User);
//       UserParty.hasOne(models.Party);

//       // UserParty.belongsTo(models.User, {foreignKey: "userId"});
//       // UserParty.belongsTo(models.Party, {as: 'party'});
// };

   // User.sync();


  return User;
}