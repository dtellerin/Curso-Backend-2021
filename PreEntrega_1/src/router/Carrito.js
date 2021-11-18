const conte = require ('./LeerCarrito.js')
const carrito = new conte.ContenedorCarrito()

const { Router } = require('express')

const routerCarrito = Router()

routerCarrito.post('/', (req, res) => {
    res.send(carrito.newCarrito())
})

routerCarrito.delete('/:id', (req, res) => {
    res.send(carrito.deleteByID(req.params.id))
})

routerCarrito.post('/:id/productos/:id_prod', (req, res) => {
    res.send(carrito.saveByID(req.params))
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    res.send(carrito.deleteByProdID(req.params))
})

routerCarrito.get('/:id/productos', (req, res) => {
    res.send(carrito.getAll(req.params.id))
})




routerCarrito.get('/', (req, res) => {
    res.send(carrito.getAll())
})

routerCarrito.get('/:id', (req, res) => {
    res.json(carrito.getByID(req.params.id))
})





routerCarrito.put('/:id', (req, res) => {
    //console.log (req.body)
    res.send(carrito.updateByID(req.body, req.params.id))
})

exports.routerCarrito = routerCarrito;