const { Model, DataTypes } = require('sequelize')

/**
 * Clase MovieSerie
 * Se define los atributos y métodos para el modelo MovieSerie
 */
class MovieSerie extends Model {
  /**
   * Método para definir asociaciones entre modelos.
   * En este caso, se establece una relación muchos a muchos entre MovieSerie, Character y Genre.
   * Las tablas intermedias 'characters_movies_series' y 'genres_movies_series' se crean para manejar estas relaciones.
   */
  static associate(models) {
    MovieSerie.belongsToMany(models.Character, {
      through: 'characters_movies_series'
    })
    MovieSerie.belongsToMany(models.Genre, {
      through: 'genres_movies_series'
    })
  }
}

MovieSerie.init(
  {
    image: DataTypes.STRING, // URL de la imagen de la película/serie
    title: DataTypes.STRING, // Título de la película/serie
    release_date: DataTypes.DATE, // Fecha de lanzamiento de la película/serie
    rating: DataTypes.INTEGER, // Calificación de la película/serie
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },
  {
    modelName: 'movies_series',
    underscored: true, // Habilitamos el uso de guiones bajos en los nombres de los campos CreatedAt, UpdatedAt y DeletedAt
    paranoid: true // Habilitamos el borrado suave con paranoid
  }
)

module.exports = MovieSerie
