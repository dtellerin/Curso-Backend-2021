const fs = require('fs')
let contenido = []
const archivoProductos = './persistencia/Productos.txt'  //archivo de persistencia de productos
const admin = fs.readFileSync('./persistencia/UserAdmin.txt') //archivo para obtener si el user es Admin

class Contenedor {
    
    //obtengo todos los productos en el archivo
    getAll() {
        contenido = fs.readFileSync(archivoProductos, 'utf-8')
        if (contenido == '') {
            return ({error: 'No hay productos cargados'})
        } else {
            return JSON.parse(contenido)
        }
    }

    //Obtiene un producto partuclar por su id del archivo
    getByID(ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            contenido = fs.readFileSync(archivoProductos, 'utf-8')
            if (contenido == '') {
                return ({error: 'No hay productos cargados'})
            } else {
                contenido = JSON.parse(contenido)
                const element = contenido.findIndex((cont) => cont.id == ids)
                if (element == undefined) {
                    return ({ error : 'producto no encontrado' })
                } else {
                    return contenido[element]
                }
            }
        }
    }
 
    //Guarda el id del nuevo producto y lo persiste en archivo
    save(obj) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo POST no autorizada'}
        } else {
            const contenidoFile = fs.readFileSync(archivoProductos)
            const ts = Math.floor(Date.now()/1000)
            
            if (contenidoFile == '') {
                contenido = []
                contenido.push(Object.assign({id: 1}, {timestamp: ts}, obj))
                this.saveFile(contenido)
                return contenido
             } else {
                contenido = JSON.parse(contenidoFile)
                const element = contenido.map((item) => item.id)
                let lastId =  parseInt(element.sort((a, b) => a - b).pop()) + 1
                contenido.push(Object.assign({id: lastId}, {timestamp: ts}, obj))
                this.saveFile(contenido)
                return contenido[contenido.findIndex((cont) => cont.id == lastId)] 
            }
        }
    }

    //Borra el prodcuto por su Id y lo persiste en archivo
    deleteByID(ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            contenido = JSON.parse(fs.readFileSync(archivoProductos, 'utf-8'))
            if (contenido == '') {
                    return ({error: 'No hay datos cargados'})
            } else {
                const element = contenido.findIndex((cont) => cont.id == ids)
                if (element == "-1") {
                        return ({ error : 'producto no encontrado' })
                    } else {
                        contenido.splice(element, 1)
                        this.saveFile(contenido)
                        return ({error: "Elemento borrado"})    
                    }
                }
            }
        }

    //Actualiza el producto por su id y lo persiste en archivo
    updateByID(obj, ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            contenido = JSON.parse(fs.readFileSync(archivoProductos, 'utf-8'))
            const ts = Math.floor(Date.now()/1000)
            if (contenido == '') {
                const contenido1 = Object.assign(obj, {id: 1}, {timestamp: ts})
                contenido.push(contenido1)
                this.saveFile(contenido)
                return contenido
            } else {
                const element = contenido.findIndex((cont) => cont.id == ids) 
                    if (element == "-1") {
                        return ({ error : 'producto no encontrado' })
                     } else {
                        contenido[element].title = obj.title
                        contenido[element].price = obj.price
                        contenido[element].thumbail = obj.thumbail
                        contenido[element].code = obj.code
                        contenido[element].descripcion = obj.descripcion
                        contenido[element].stock = obj.stock
                        this.saveFile(contenido)
                        return contenido[element]
                }
            }
        }   
    }

    //Funcion de guardado en arvhiso
    async saveFile(content) {
       await fs.promises.writeFile(archivoProductos, JSON.stringify(content, null, 2))
        .then (() => {console.log('Escritura exitosa')})
        .catch (error => console.log(`error escritura ${error}`))
    }

}

module.exports = {Contenedor}