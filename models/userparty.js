module.exports = function(sequelize, DataTypes) {
    var UserParty = sequelize.define("UserParty", {
      userId: DataTypes.STRING,
      partyId: DataTypes.STRING,
    });

    // UserParty.associate = function(models) {
           
    //         UserParty.belongsTo(models.User);
    //         UserParty.belongsTo(models.Party);

    //         // UserParty.belongsTo(models.User, {foreignKey: "userId"});
    //         // UserParty.belongsTo(models.Party, {as: 'party'});
    //   };

    //UserParty.sync();

  return UserParty;
}