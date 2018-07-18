module.exports = function(sequelize, DataTypes) {
    var Party = sequelize.define("Party", {
      // Giving the Party model a name of type STRING
      partyId : {type: DataTypes.INTEGER, autoincrement:true,primaryKey: true},
      partyName: DataTypes.STRING,
      location:  DataTypes.STRING,
      date: DataTypes.DATEONLY,
      time :DataTypes.TIME,
      hostName :DataTypes.STRING,
      guest: DataTypes.STRING,
      categoriesOfItems:DataTypes.STRING,
      //guests:{ type : DataTypes.ARRAY(DataTypes.STRING), defaultValue: null},
      //categoriesOfItems:{ type : DataTypes.ARRAY(DataTypes.STRING), defaultValue: null}
    });
  
    Party.associate = function(models) {
      
      Party.hasMany(models.Guests,{
       foreignKey : "guestId"
      });

      Party.hasOne(models.Host,{
    foreignKey:"hostId"
      });
      Party.hasMany(models.Items,{
        foreignKey : "itemsId"
       });
  };

  return Party;
}