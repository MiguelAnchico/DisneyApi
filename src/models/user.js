const { Model, DataTypes } = require('sequelize')

/**
 * Clase User
 * Se definen los atributos y métodos para el modelo User
 */
class User extends Model {
  /**
   * Método para definir asociaciones entre modelos.
   * En este caso, se establece una relación muchos a muchos entre User y Role.
   * La tabla intermedia 'user_roles' se crea para manejar esta relación,
   * permitiendo que un usuario pueda tener múltiples roles y viceversa.
   */
  static associate(models) {
    User.belongsToMany(models.Role, {
      through: 'user_roles'
    })
  }
}

User.init(
  {
    username: DataTypes.STRING, // Nombre del usuario
    email: DataTypes.STRING, // Correo del usuario
    password: DataTypes.STRING, // Contraseña del usuario
    last_login: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },
  {
    modelName: 'users',
    underscored: true, // Habilitamos el uso de guiones bajos en los nombres de los campos CreatedAt, UpdatedAt y DeletedAt
    paranoid: true // Habilitamos el borrar soft con paranoid
  }
)

module.exports = User
