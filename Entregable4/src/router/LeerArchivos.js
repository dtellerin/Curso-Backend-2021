//const fs = require('fs')
let contenido = []

class Contenedor {
    
    getAll() {
        if (contenido == '') {
            return ({error: 'No hay datos cargados'})
        } else {
            return contenido
        }
    }
    getByID(ids) {
        if (contenido == '') {
            return ({error: 'No hay datos cargados'})
        } else {
            const element = contenido.findIndex((cont) => cont.id == ids)
            if (element == undefined) {
                return ({ error : 'producto no encontrado' })
            } else {
                return contenido[element]   
            }
        }
    }
 
    save(obj) {
            if (contenido == '') {
                const contenido1 = Object.assign(obj, {id: 1})
                contenido.push(contenido1)
                return contenido
            } else if (contenido[0].id != '') {
                const element = contenido.map((item) => item.id)
                let lastId =  parseInt(element.sort((a, b) => a - b).pop()) + 1
                const contenido1 = Object.assign(obj, {id: lastId})
                contenido.push(contenido1)
                return contenido[contenido.findIndex((cont) => cont.id == lastId)] 
            } else {
                return contenido[contenido.findIndex((cont) => cont.id == lastId)]
            }
        }
    deleteByID(ids) {
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

    updateByID(obj, ids) {
            if (contenido == '') {
                const contenido1 = Object.assign(obj, {id: 1})
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
                        return contenido[element]
            }
        }
    }
}

module.exports = {Contenedor}