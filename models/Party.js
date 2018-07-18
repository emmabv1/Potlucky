module.exports = function(sequelize, DataTypes) {
    var Party = sequelize.define("Party", {
      partyName: DataTypes.STRING,
      host: DataTypes.STRING,
      address: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
      limit: DataTypes.INTEGER,
      image: DataTypes.STRING,
      guests: DataTypes.STRING, //array
      itemCategories: DataTypes.STRING //array
    });
  
  //   Party.associate = function(models) {
  //     // Associating Party with Posts
  //     // When an Party is deleted, also delete any associated Posts
  //     Party.hasMany(models.Items,{
  //       foreignKey : "itemsId"
  //      });
  // };

  return Party;
}