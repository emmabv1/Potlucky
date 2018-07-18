module.exports = function(sequelize, DataTypes) {
    var Host = sequelize.define("Host", {
      // Giving the Host model a name of type STRING
      hostId : {type: DataTypes.INTEGER, autoincrement:true,primaryKey: true},
      hostName: DataTypes.STRING,
      partyId:DataTypes.INTEGER,
      email: { type: DataTypes.STRING},
      password: DataTypes.STRING,
     
    });
  
    Host.associate = function(models) {
      // });
      Host.belongsTo(models.Party,{
        foreignKey:"hostId"
      });
    

  };

  return Host;
}