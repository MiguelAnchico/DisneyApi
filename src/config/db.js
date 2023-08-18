const Sequelize = require('sequelize')
const Config = require('./config')

/**
 * Creamos los modelos en esta sección
 */

// Creación de la conexión a la base de datos
const sequelize = new Sequelize(
  Config.DB_NAME,
  Config.DB_USER,
  Config.DB_PASSWORD,
  {
    host: Config.DB_HOST,
    dialect: 'mysql'
  }
)

/**
 * Definimos los modelos en esta sección
 */

// Exportamos los modelos
module.exports = sequelize
