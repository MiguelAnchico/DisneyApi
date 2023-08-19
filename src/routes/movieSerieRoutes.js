const express = require('express')
const validate = require('../middlewares/validate')
const MovieSerieController = require('../controllers/movieSerieController')
const movieSerieValidations = require('./validations/movieSerieValidations') // Importar las validaciones

const router = express.Router()

router.get('/', MovieSerieController.getAllMoviesSeries)
router.get('/:id', MovieSerieController.getMovieSerieById)
router.post(
  '/',
  movieSerieValidations,
  validate,
  MovieSerieController.createMovieSerie
)
router.put(
  '/:id',
  movieSerieValidations,
  validate,
  MovieSerieController.updateMovieSerie
)
router.delete('/:id', MovieSerieController.deleteMovieSerie)

module.exports = router
