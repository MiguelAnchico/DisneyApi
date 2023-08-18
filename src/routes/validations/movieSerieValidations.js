const { check } = require('express-validator')

const movieSerieValidations = [
  check('image')
    .notEmpty()
    .withMessage('La URL de la imagen es obligatoria')
    .isURL()
    .withMessage('La URL de la imagen debe ser válida'),
  check('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 1 })
    .withMessage('El título debe tener al menos 1 carácter'),
  check('release_date')
    .notEmpty()
    .withMessage('La fecha de lanzamiento es obligatoria')
    .isDate()
    .withMessage('La fecha de lanzamiento debe ser una fecha válida'),
  check('rating')
    .notEmpty()
    .withMessage('La calificación es obligatoria')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe ser un número entre 1 y 5')
]

module.exports = movieSerieValidations
