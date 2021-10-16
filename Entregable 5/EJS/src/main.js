const conte = require ('./router/LeerArchivos.js')
const contenido = new conte.Contenedor()
let productos = []

const  express  = require('express')
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('inicio')
})

app.get ('/productos', (req, res) => {
    const productos = contenido.getAll()
    res.render('historial1', {productos})
})

app.post('/productos', (req, res) => {
    productos = contenido.save(req.body)
    res.redirect('/')
});

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))