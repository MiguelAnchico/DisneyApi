const { Server } = require('./server/server')
// Creación de una nueva instancia del servidor
const server = new Server()

// Inicio del servidor
server.listen()

const migration = require('./migrations/character')

migration
  .up()
  .then(() => {
    console.log('Migración completada')
  })
  .catch((error) => {
    console.error('Error en la migración:', error)
  })
