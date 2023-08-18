const { Model, DataTypes } = require('sequelize')

/**
 * Clase Character
 * Se definen los atributos y métodos para el modelo Character
 */
class Character extends Model {
  /**
   * Método para definir asociaciones entre modelos.
   * En este caso, se establece una relación muchos a muchos entre Character y MovieSerie.
   * La tabla intermedia 'characters_movies_series' se crea para manejar esta relación,
   * permitiendo que un personaje pueda estar asociado con múltiples películas o series y viceversa.
   */
  static associate(models) {
    Character.belongsToMany(models.MovieSerie, {
      through: 'characters_movies_series'
    })
  }
}

Character.init(
  {
    image: DataTypes.STRING, // URL de la imagen del personaje
    name: DataTypes.STRING, // Nombre del personaje
    age: DataTypes.INTEGER, // Edad del personaje
    weight: DataTypes.FLOAT, // Peso del personaje
    backstory: DataTypes.STRING // Historia del personaje
  },
  {
    modelName: 'characters',
    underscored: true, // Habilitamos el uso de guiones bajos en los nombres de los campos CreatedAt, UpdatedAt y DeletedAt
    paranoid: true // Habilitamos el borrado soft con paranoid
  }
)

module.exports = Character
