const sequelize = require('../config/db')
const CharacterModel = require('./character')
const MovieSerieModel = require('./movieSerie')
const GenreModel = require('./genre')
const UserModel = require('./user')
const RoleModel = require('./role')

/**
 * Inicializamos los modelos en esta sección
 */

const Character = CharacterModel(sequelize, sequelize.Sequelize)
const MovieSerie = MovieSerieModel(sequelize, sequelize.Sequelize)
const Genre = GenreModel(sequelize, sequelize.Sequelize)
const User = UserModel(sequelize, sequelize.Sequelize)
const Role = RoleModel(sequelize, sequelize.Sequelize)

const models = {
  Character,
  MovieSerie,
  Genre,
  User,
  Role
}

/**
 * Definimos las asociaciones entre los modelos en esta sección
 */
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

/**
 * Exportamos los modelos y la conexión a la base de datos
 */
module.exports = {
  Character,
  MovieSerie,
  Genre,
  User,
  Role,
  sequelize
}
