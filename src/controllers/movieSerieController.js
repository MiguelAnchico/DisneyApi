const { MovieSerie, Genre, Character, sequelize } = require('../models')

/**
 * Clase MovieSerieController
 * Se definen los atributos y métodos para el controlador de Películas/Series
 */
class MovieSerieController {
  /**
   * Método para obtener todas las películas/series
   */
  async getAllMoviesSeries(req, res) {
    try {
      const { name, genre, order } = req.query

      // Definir las condiciones de búsqueda
      const whereConditions = {}
      if (name) whereConditions.title = name

      // Incluir géneros si se especifica
      const includeConditions = []
      if (genre) {
        includeConditions.push({
          model: Genre,
          as: 'genres',
          where: { id: genre }
        })
      }

      const moviesSeries = await MovieSerie.findAll({
        attributes: ['image', 'title', 'release_date'], // Mostrar solo imagen, título y fecha de creación
        where: whereConditions,
        include: includeConditions,
        order: [['release_date', order || 'ASC']]
      })

      res.json(moviesSeries)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  /**
   * Método para obtener una película/serie por ID
   * Devuelve todos los campos de la película/serie y los personajes asociados
   */
  async getMovieSerieById(req, res) {
    try {
      const movieSerieId = req.params.id

      // Incluir personajes asociados
      const includeConditions = [{ model: Character, as: 'characters' }]

      const movieSerie = await MovieSerie.findByPk(movieSerieId, {
        include: includeConditions
      })

      if (!movieSerie) {
        return res.status(404).json({ error: 'Película/Serie no encontrada' })
      }

      res.json(movieSerie)
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  /**
   * Método para crear una película/serie
   */
  async createMovieSerie(req, res) {
    const t = await sequelize.transaction() // Iniciar una transacción

    try {
      const movieSerieData = req.body
      const movieSerie = await MovieSerie.create(movieSerieData, {
        transaction: t
      })

      await t.commit() // Confirmar la transacción

      res.json(movieSerie)
    } catch (error) {
      await t.rollback() // Revertir la transacción en caso de error
      res.status(500).json({ error: 'Error al crear la película/serie' })
    }
  }

  /**
   * Método para actualizar una película/serie
   */
  async updateMovieSerie(req, res) {
    try {
      const movieSerie = await MovieSerie.findByPk(req.params.id)
      if (!movieSerie) {
        return res.status(404).json({ error: 'Película/Serie no encontrada' })
      }
      await movieSerie.update(req.body)
      res.json(movieSerie)
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la película/serie' })
    }
  }

  /**
   * Método para eliminar una película/serie
   */
  async deleteMovieSerie(req, res) {
    try {
      const movieSerie = await MovieSerie.findByPk(req.params.id)
      if (!movieSerie) {
        return res.status(404).json({ error: 'Película/Serie no encontrada' })
      }
      await movieSerie.destroy()
      res.json({ message: 'Película/Serie eliminada exitosamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la película/serie' })
    }
  }
}

module.exports = new MovieSerieController()
