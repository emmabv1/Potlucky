module.exports = function(sequelize, DataTypes) {
    var UserParty = sequelize.define("UserParty", {
      userId: DataTypes.INTEGER,
      partyId: DataTypes.INTEGER,
    });

    // UserParty.associate = function(models) {
    //         // Associating Party with Posts
    //         // When an Party is deleted, also delete any associated Posts
    //         UserParty.hasMany(models.User,{});
    //         UserParty.hasMany(models.Party,{});
    //     };

  return UserParty;
}