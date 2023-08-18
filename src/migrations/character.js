const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

module.exports = {
  up: async () => {
    await sequelize
      .define(
        'Character',
        {
          image: DataTypes.STRING,
          name: DataTypes.STRING,
          age: DataTypes.INTEGER,
          weight: DataTypes.FLOAT,
          backstory: DataTypes.STRING
        },
        {
          underscored: true,
          paranoid: true
        }
      )
      .sync({ force: false })
  },
  down: async () => {
    await sequelize.models.Character.drop()
  }
}
