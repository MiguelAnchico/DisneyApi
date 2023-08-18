const { Model, DataTypes } = require('sequelize')

class Genre extends Model {
  /**
   * Método para definir asociaciones entre modelos.
   * En este caso, se establece una relación muchos a muchos entre Genre y MovieSerie.
   * La tabla intermedia 'genres_movies_series' se crea para manejar esta relación,
   * permitiendo que un género pueda estar asociado con múltiples películas o series y viceversa.
   */
  static associate(models) {
    Genre.belongsToMany(models.MovieSerie, {
      through: 'genres_movies_series'
    })
  }
}

Genre.init(
  {
    name: DataTypes.STRING, // nombre del genero
    image: DataTypes.STRING, // URL de la imagen del genero
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },
  {
    modelName: 'genres',
    underscored: true, // Habilitamos el uso de guiones bajos en los nombres de los campos CreatedAt, UpdatedAt y DeletedAt
    paranoid: true // Habilitamos el borrar soft con paranoid
  }
)

module.exports = Genre
