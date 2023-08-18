const { Character, MovieSerie } = require('../models')

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
      const characters = await Character.findAll({
        include: MovieSerie
      })
      res.json(characters)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los personajes' })
    }
  }

  /**
   * Método para crear un personaje
   */
  async createCharacter(req, res) {
    try {
      const character = await Character.create(req.body)
      res.json(character)
    } catch (error) {
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
