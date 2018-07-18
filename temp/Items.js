module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
      // Giving the Items model a name of type STRING
      itemsId : {
        type: DataTypes.INTEGER, 
        autoincrement:true,
        primaryKey: true
      },
      itemsName: DataTypes.STRING,
      itemQuantity :DataTypes.INTEGER,
      //partyId:DataTypes.INTEGER,
      itemCategory:DataTypes.STRING,
      personInCharge:DataTypes.STRING,
    });
  
    Items.associate = function(models) {
           
      Items.belongsTo(models.Party,{
        foreignKey:"itemsId"
      });
  };

  return Items;
}