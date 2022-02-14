import fs from 'fs'
let contenido = []
const admin = fs.readFileSync('./persistencia/UserAdmin.txt') //archivo para obtener si el user es Admin

class ContenedorProductos {
    
    //obtengo todos los productos en el archivo
    getAll() {
         if (contenido == '') {
            return ({error: 'No hay productos cargados'})
        } else {
            return contenido
        }
    }

    //Obtiene un producto partuclar por su id del archivo
    getByID(ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            if (contenido == '') {
                return ({error: 'No hay productos cargados'})
            } else {
                const element = contenido.findIndex((cont) => cont.id == ids)
                console.log(`element ${element}`)
                if (element == -1) {
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
             const ts = Math.floor(Date.now()/1000)
            
            if (contenido == '') {
                contenido.push(Object.assign({id: 1}, {timestamp: ts}, obj))
                return contenido
             } else {
                const element = contenido.map((item) => item.id)
                let lastId =  parseInt(element.sort((a, b) => a - b).pop()) + 1
                contenido.push(Object.assign({id: lastId}, {timestamp: ts}, obj))
                return contenido[contenido.findIndex((cont) => cont.id == lastId)] 
            }
        }
    }

    //Borra el prodcuto por su Id y lo persiste en archivo
    deleteByID(ids) {
        if (admin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            if (contenido == '') {
                    return ({error: 'No hay datos cargados'})
            } else {
                const element = contenido.findIndex((cont) => cont.id == ids)
                if (element == "-1") {
                        return ({ error : 'producto no encontrado' })
                    } else {
                        contenido.splice(element, 1)
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
            const ts = Math.floor(Date.now()/1000)
            if (contenido == '') {
                const contenido1 = Object.assign(obj, {id: 1}, {timestamp: ts})
                contenido.push(contenido1)
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
                        return contenido[element]
                }
            }
        }   
    }

}

export default {ContenedorProductos}