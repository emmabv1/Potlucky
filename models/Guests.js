module.exports = function(sequelize, DataTypes) {
    var Guests = sequelize.define("Guests", {
      // Giving the Guests model a name of type STRING
      guestId: {type: DataTypes.INTEGER, autoincrement:true,primaryKey: true},
      partyId:DataTypes.INTEGER,
      guestName: DataTypes.STRING,
      email: { type: DataTypes.STRING},
      password: DataTypes.STRING,
    });
  
    Guests.associate = function(models) {
      // Associating Guests with Posts
      // When an Guests is deleted, also delete any associated Posts

      Guests.belongsTo(models.Party,{
        foreignKey:"guestId"
      });
  };
  return Guests;
}