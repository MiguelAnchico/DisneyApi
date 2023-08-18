const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

class Server {
  constructor() {
    // Configuración de encabezados
    this.headers = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    }

    // Crear aplicación Express
    this.app = express()
    this.port = process.env.PORT
    this.server = http.createServer(this.app)

    // Definición de rutas
    this.paths = {}

    // Inicialización de métodos
    this.connectToDB()
    this.addMiddlewares()
    this.setRoutes()
  }

  /**
   * Método para conectar a la base de datos
   */
  async connectToDB() {}

  /**
   * Método para agregar middlewares
   */
  addMiddlewares() {
    this.app.use(cors(this.headers.cors))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(express.static('public'))
  }

  /**
   * Método para configurar rutas
   */
  setRoutes() {}

  /**
   * Método para iniciar el servidor
   */
  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor Corriendo en el Puerto', this.port)
    })
  }
}

module.exports = { Server }
