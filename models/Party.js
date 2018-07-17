module.exports = function(sequelize, DataTypes) {
    var Party = sequelize.define("Party", {
      // Giving the Party model a name of type STRING
      partyId : {type: DataTypes.INTEGER, autoincrement:true,primaryKey: true},
      partyName: DataTypes.STRING,
      location:  DataTypes.STRING,
      date: DataTypes.DATEONLY,
      time :DataTypes.TIME,
      hostName :DataTypes.STRING,
      guests: DataTypes.STRING,
      categoriesOfItems:DataTypes.STRING,
      partyImage : DataTypes.STRING,
      //guests:{ type : DataTypes.ARRAY(DataTypes.STRING), defaultValue: null},
      //categoriesOfItems:{ type : DataTypes.ARRAY(DataTypes.STRING), defaultValue: null}
    });
  
   Party.associate = function(models) {
    
      Party.hasMany(models.Items,{
        foreignKey : "itemsId"
       });
  };

  return Party;
}