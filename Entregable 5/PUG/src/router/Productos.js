const conte = require ('./LeerArchivos.js')
const productos = new conte.Contenedor()

const  Router  = require('express')
const routerProductos = Router()
routerProductos.use(Router.urlencoded({ extended: true }))

routerProductos.set('views', '../views');
routerProductos.set('view engine', 'ejs');

routerProductos.get('/', (req, res) => {
    res.render('inicio', productos.getAll())
})

routerProductos.post('/', (req, res) => {
   productos.save(req.body)
   res.redirect('/')
});

//app.delete('/:id', (req, res) => {
//    res.send(productos.deleteByID(req.params.id))
//})

//app.put('/:id', (req, res) => {
    //console.log (req.body)
//    res.send(productos.updateByID(req.body, req.params.id))
//})

//app.get('/:id', (req, res) => {
//    res.json(productos.getByID(req.params.id))
//})

exports.routerProductos = routerProductos;