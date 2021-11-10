const ChatSql = require('../scripts/sql_chat.js')
const ArticulosSql = require('../scripts/sql_productos.js')
const { optionssqlite3 } = require('../options/SQLite3.js')
const { optionsMariaDB } = require('../options/MariaDB.js')

const sqlite3 = new ChatSql(optionssqlite3)
const mariadb = new ArticulosSql(optionsMariaDB)

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

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')
    
    socket.emit('mensajes', mensajes)

    socket.emit('productos', await mariadb.listarArticulos())
    
    socket.on('nuevoMensaje', async mensaje => {
        mensajes.push(mensaje)
        io.sockets.emit('mensajes', mensajes)
        try {
            await sqlite3.insertarChats(mensaje)  
            console.log("2) chat insertado")
        } catch (error) {
            console.log(error)
        } finally {
            console.log('chat insertado: ' + JSON.stringify(mensajes))
        }
    })
    
    socket.on('update', async producto => {
        productos.push(producto)
            try {
                await mariadb.insertarArticulos(producto)  
                console.log("2) articulo insertado")
            } catch (error) {
                console.log(error)
            } finally {
                console.log('articulo insertado: ' + JSON.stringify(productos))
            }

    })
    
})

io.on('disconnect', reason => {
    sqlite3.close()
    mariadb.close()
    console.log('Cliente Desconectado')
})


const PORT = 8080
const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))