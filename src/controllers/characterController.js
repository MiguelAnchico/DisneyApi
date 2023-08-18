const { Character, MovieSerie, sequelize } = require('../models')

/**
 * Clase CharacterController
 * Se definen los atributos y métodos para el controlador de Personajes
 */
class CharacterController {
  /**
   * Método para obtener todos los personajes
   */
  async getAllCharacters(req, res) {
    try {
      const { name, age, weight, movies } = req.query

      // Definir las condiciones de búsqueda
      const whereConditions = {}
      if (name) whereConditions.name = name
      if (age) whereConditions.age = age
      if (weight) whereConditions.weight = weight

      // Incluir películas/series si se especifica
      const includeConditions = []
      const movieSerieCondition = {
        model: MovieSerie,
        as: 'MoviesSeries'
      }

      // Incluir el id de la pelicula en caso de exista la condicion
      if (movies) movieSerieCondition.where = { id: movies }

      includeConditions.push(movieSerieCondition)

      const characters = await Character.findAll({
        where: whereConditions,
        include: includeConditions
      })

      res.json(characters)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  /**
   * Método para crear un personaje
   */
  async createCharacter(req, res) {
    const t = await sequelize.transaction() // Iniciar una transacción

    try {
      const characterData = req.body
      const movieSerieId = characterData.movieSerieId

      // Crear el personaje dentro de la transacción
      const character = await Character.create(characterData, {
        transaction: t
      })

      // Buscar la película o serie por ID dentro de la transacción
      const movieSerie = await MovieSerie.findByPk(movieSerieId, {
        transaction: t
      })

      if (!movieSerie) {
        throw new Error('Película o serie no encontrada')
      }

      // Asociar el Character con el MovieSerie encontrado dentro de la transacción
      await character.addMoviesSeries(movieSerie, { transaction: t })

      await t.commit() // Confirmar la transacción

      res.json(character)
    } catch (error) {
      await t.rollback() // Revertir la transacción en caso de error
      console.error('Error al crear y asociar los modelos:', error)
      res.status(500).json({ error: 'Error al crear el personaje' })
    }
  }

  /**
   * Método para actualizar un personaje
   */
  async updateCharacter(req, res) {
    try {
      const character = await Character.findByPk(req.params.id)
      if (!character) {
        return res.status(404).json({ error: 'Personaje no encontrado' })
      }
      await character.update(req.body)
      res.json(character)
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el personaje' })
    }
  }

  /**
   * Método para eliminar un personaje
   */
  async deleteCharacter(req, res) {
    try {
      const character = await Character.findByPk(req.params.id)
      if (!character) {
        return res.status(404).json({ error: 'Personaje no encontrado' })
      }
      await character.destroy()
      res.json({ message: 'Personaje eliminado exitosamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el personaje' })
    }
  }
}

module.exports = new CharacterController()
