const express = require('express')
const { check } = require('express-validator')
const validate = require('../middlewares/validate')
const CharacterController = require('../controllers/characterController')

const router = express.Router()

// Validaciones para la creación y actualización de un personaje
const characterValidations = [
  check('image')
    .notEmpty()
    .withMessage('La URL de la imagen es obligatoria')
    .isURL()
    .withMessage('La URL de la imagen debe ser válida'),
  check('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 1 })
    .withMessage('El nombre debe tener al menos 1 carácter'),
  check('age')
    .notEmpty()
    .withMessage('La edad es obligatoria')
    .isInt({ min: 0 })
    .withMessage('La edad debe ser un número no negativo'),
  check('weight')
    .notEmpty()
    .withMessage('El peso es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El peso debe ser un número no negativo'),
  check('backstory')
    .notEmpty()
    .withMessage('La historia es obligatoria')
    .isLength({ min: 1 })
    .withMessage('La historia debe tener al menos 1 carácter')
]

router.get('/', CharacterController.getAllCharacters)
router.post(
  '/',
  characterValidations,
  validate,
  CharacterController.createCharacter
)
router.put(
  '/:id',
  characterValidations,
  validate,
  CharacterController.updateCharacter
)
router.delete('/:id', CharacterController.deleteCharacter)

module.exports = router
