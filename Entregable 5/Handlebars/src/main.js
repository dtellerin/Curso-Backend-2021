const conte = require ('./router/LeerArchivos.js')
const contenido = new conte.Contenedor()
const exphbs = require('express-handlebars')
let productos = []

const  express  = require('express')
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'inicio.hbs'
  }))

app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('formulario.hbs')
})

app.get ('/productos', (req, res) => {
    const productos = contenido.getAll()
    const hayProductos = productos.length
    res.render('historial.hbs', {productos})
})

app.post('/productos', (req, res) => {
    productos = contenido.save(req.body)
    res.redirect('/')
});

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))