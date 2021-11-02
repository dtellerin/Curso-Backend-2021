const express = require('express')
const fs = require ('fs')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const mensajes = []
const productos = []

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')

    socket.emit('mensajes', mensajes)

    socket.on('nuevoMensaje', async mensaje => {
        mensajes.push(mensaje)
        await fs.promises.writeFile('historial_chat.txt', JSON.stringify(mensajes, null, 2))
        io.sockets.emit('mensajes', mensajes)
    })

    socket.emit('productos', productos);

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos);
    })
    
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))