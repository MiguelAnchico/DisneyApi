const express = require('express')
const characterValidations = require('./validations/characterValidations')
const validate = require('../middlewares/validate')
const CharacterController = require('../controllers/characterController')

const router = express.Router()

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
