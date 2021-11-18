const conte = require ('./LeerProductos.js')
//const productos = new conte.Contenedor('src/router/productos.txt')
const productos = new conte.Contenedor()

const { Router } = require('express')

const routerProductos = Router()


routerProductos.get('/', (req, res) => {
    res.send(productos.getAll())
})

routerProductos.get('/:id', (req, res) => {
    res.json(productos.getByID(req.params.id))
})

routerProductos.post('/', (req, res) => {
    res.send(productos.save(req.body));
});

routerProductos.delete('/:id', (req, res) => {
    res.send(productos.deleteByID(req.params.id))
})

routerProductos.put('/:id', (req, res) => {
    //console.log (req.body)
    res.send(productos.updateByID(req.body, req.params.id))
})

exports.routerProductos = routerProductos;