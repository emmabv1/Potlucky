module.exports = function(sequelize, DataTypes) {
    var Party = sequelize.define("Party", {
      partyName: DataTypes.STRING,
      hostId: DataTypes.INTEGER,
      hostName: DataTypes.STRING,
      address: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
      limit: DataTypes.INTEGER,
      image: DataTypes.STRING,
     // guests: DataTypes.STRING, //array
     // itemCategories: DataTypes.STRING //array
    });

    //Party.sync();

  return Party;
}