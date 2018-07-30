module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
      catName: DataTypes.STRING,
      party: DataTypes.STRING,
      limit: DataTypes.INTEGER,
    });

  return Category;
}