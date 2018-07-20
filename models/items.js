module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
      itemName: DataTypes.STRING,
      itemQuantity: DataTypes.INTEGER,
      partyId: DataTypes.STRING,
      category: DataTypes.STRING,
      guest:DataTypes.STRING,
    });
  
  //   Items.associate = function(models) {
  //     // Associating Items with Posts
  //     // When an Items is deleted, also delete any associated Posts
           
  //     Items.belongsTo(models.Party,{
  //       foreignKey:"itemsId"
  //     });
  // };

  return Items;
}