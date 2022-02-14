import routerProductos  from './router/Productos.js'
import routerCarrito  from './router/Carrito.js'
import routerProductosTest from './router/ProductosTest.js'
import routerSesiones from './router/Sesiones.js'
import routerSystemInfo from './router/SystemInfo.js'
import routerCalculoRandom from './router/calculo.js'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {puerto} from '../config/EnvironmentArgs.js'

const app = express()
const httpServer = new createServer(app)
const io = new Server(httpServer)

let mensajes = []
import {PersistenciaProductos, PersistenciaChat} from '../daos/index.js'
const productos = await PersistenciaProductos()
const chats = await PersistenciaChat()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/productos-test', routerProductosTest)
app.use('/api/sesion', routerSesiones)
app.use('/api/info', routerSystemInfo)
app.use('/api/random', routerCalculoRandom)

app.set('views', './public/views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    await res.redirect('/api/sesion')
})
      
app.get('/info', async (req, res) => {
    await res.redirect('/api/info')
})

app.get('/random', async (req, res) => {
    await res.redirect('/api/random?cant=' + req.query.cant)
})

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')
    //console.log('Obtengo Chats')
    socket.emit('mensajes', await chats.getAll())
    //console.log('Obtengo productos')
    socket.emit('productos', await productos.getAll())
    
    socket.on('nuevoMensaje', async mensaje => {
        mensajes = await chats.saveChat(mensaje)
        try {
            io.sockets.emit('mensajes', mensajes)
        } catch (error) {
            console.log(error)
            io.sockets.emit('mensajes', 'error al escribir el chat')
        } finally {
            console.log('chat insertado: ' + JSON.stringify(mensaje))
            }
    })
    
    socket.on('update', async producto => {
       try {
                await productos.save(producto)  
                //console.log("2) articulo insertado")
            } catch (error) {
                console.log(error)
            } finally {
                console.log('articulo insertado: ' + JSON.stringify(productos))
            }

    })
    
})


const PORT = puerto 
const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))