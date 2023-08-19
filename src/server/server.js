require('dotenv').config()

const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('../config/db')
require('../models')
const characterRoutes = require('../routes/characterRoutes')
const movieSerieRoutes = require('../routes/movieSerieRoutes')
const { MovieSerie, Genre } = require('../models')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json')

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
    this.paths = {
      characters: '/characters',
      movieSerie: '/movies',
      swagger: '/api-docs'
    }

    // Inicialización de métodos
    this.connectToDB()
    this.addMiddlewares()
    this.setRoutes()
    this.createDataTesting()
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
  setRoutes() {
    this.app.use(this.paths.characters, characterRoutes)
    this.app.use(this.paths.movieSerie, movieSerieRoutes)
    this.app.use(
      this.paths.swagger,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    )
  }

  createDataTesting() {
    MovieSerie.bulkCreate([
      {
        image: 'url1',
        title: 'Película 1',
        release_date: '2022-01-01',
        rating: 5
      },
      {
        image: 'url2',
        title: 'Película 2',
        release_date: '2022-02-01',
        rating: 4
      }
    ])

    Genre.bulkCreate([
      { name: 'Acción' },
      { name: 'Comedia' },
      { name: 'Drama' }
    ])
  }

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
