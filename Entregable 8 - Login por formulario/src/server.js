import routerProductos  from './router/Productos.js'
import routerCarrito  from './router/Carrito.js'
import routerProductosTest from './router/ProductosTest.js'
import routerSesiones from './router/Sesiones.js'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = new createServer(app)
const io = new Server(httpServer)

let mensajes = []
import {PersistenciaProductos} from '../daos/index.js'
const productos = await PersistenciaProductos()
import {PersistenciaChat} from '../daos/index.js'
const chats = await PersistenciaChat()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/productos-test', routerProductosTest)
app.use('/api/login', routerSesiones)

app.set('views', './public/views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
         res.redirect('/api/login')
})
 
    
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')
    
    socket.emit('mensajes', await chats.getAll())
   
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
                console.log("2) articulo insertado")
            } catch (error) {
                console.log(error)
            } finally {
                console.log('articulo insertado: ' + JSON.stringify(productos))
            }

    })
    
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))