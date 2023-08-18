require('dotenv').config()

const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('../config/db')

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
    this.port = process.env.PORT || 4000
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
  async connectToDB() {
    try {
      // Intenta autenticarse con la base de datos
      await sequelize.authenticate()
      // Si la autenticación es exitosa, imprime un mensaje en la consola
      console.log('Conexión a la base de datos establecida con éxito.')
    } catch (error) {
      // Si hay un error durante la autenticación, captura el error e imprime un mensaje en la consola
      console.error('No se pudo conectar a la base de datos:', error)
    }
  }

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
