import express from 'express'
import routerProductos  from './router/Productos.js'
import routerCarrito  from './router/Carrito.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))