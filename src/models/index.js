const sequelize = require('../config') // Importamos la configuración de la conexión
const CharacterModel = require('./character')
const MovieSerieModel = require('./movieSerie')
const GenreModel = require('./genre')

/**
 * Inicializamos los modelos en esta sección
 */
const Character = CharacterModel(sequelize, sequelize.Sequelize)
const MovieSerie = MovieSerieModel(sequelize, sequelize.Sequelize)
const Genre = GenreModel(sequelize, sequelize.Sequelize)

/**
 * Definimos las asociaciones entre los modelos en esta sección
 */
Character.associate({ MovieSerie })
MovieSerie.associate({ Genre, Character })
Genre.associate({ MovieSerie })

/**
 * Exportamos los modelos y la conexión a la base de datos
 */
module.exports = {
  Character,
  MovieSerie,
  Genre,
  sequelize
}

const UserModel = require('./user')
const RoleModel = require('./role')

// Inicializaciones previas...

const User = UserModel(sequelize, sequelize.Sequelize)
const Role = RoleModel(sequelize, sequelize.Sequelize)

/**
 * Definimos las asociaciones entre los modelos en esta sección
 */
// Asociaciones previas...
User.associate({ Role })
Role.associate({ User })

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
