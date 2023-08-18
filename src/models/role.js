const { Model, DataTypes } = require('sequelize')

/**
 * Clase Role
 * Se definen los atributos y métodos para el modelo Role
 */
class Role extends Model {
  /**
   * Método para definir asociaciones entre modelos.
   * En este caso, se establece una relación muchos a muchos entre Role y User.
   * La tabla intermedia 'user_roles' se crea para manejar esta relación,
   * permitiendo que un rol pueda estar asociado con múltiples usuarios y viceversa.
   */
  static associate(models) {
    Role.belongsToMany(models.User, {
      through: 'user_roles'
    })
  }
}

Role.init(
  {
    role: DataTypes.STRING, // Nombre del rol
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },
  {
    modelName: 'roles',
    underscored: true,
    paranoid: true // Habilitamos el borrar soft con paranoid
  }
)

module.exports = Role
