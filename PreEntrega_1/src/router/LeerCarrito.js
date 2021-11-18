const fs = require('fs')
let contenidoCarrito = []
const archivoCarritos = './persistencia/Carritos.txt'
const archivoProductos = './persistencia/Productos.txt'
let lastId = []
let arrayCarritos = []

class ContenedorCarrito {
    
    //Agrega un nuevo carrito
    newCarrito() {
        const ts = Math.floor(Date.now()/1000)
        arrayCarritos = fs.readFileSync(archivoCarritos)
        let arrayTmpCarrito = []

            if (arrayCarritos == '') {
                lastId = 1
            } else{
                arrayTmpCarrito = JSON.parse(arrayCarritos)
                const element = arrayTmpCarrito.map((item) => item.id)
                lastId =  parseInt(element.sort((a, b) => a - b).pop()) + 1
            }

        contenidoCarrito = Object.assign({id: lastId}, {timestamp: ts}, {producto: []})
        arrayTmpCarrito.push(contenidoCarrito)
        this.saveFile(arrayTmpCarrito)
        return ({id: lastId})
    }

    //Borra el carrito de acuerdo al id
    deleteByID(ids) {

        const arrayCarritos = JSON.parse(fs.readFileSync(archivoCarritos))
        if (arrayCarritos == '') {
                return ({error: 'No hay carritos para borrar'})
        } else {
            const element = arrayCarritos.findIndex((cont) => cont.id == ids)
               if (element == "-1") {
                    return ({ error : 'Carrito no encontrado' })
                } else {
                    arrayCarritos.splice(element, 1)
                    this.saveFile(arrayCarritos)
                    return ({error: "Carrito borrado"})    
                }
            }
    }


    saveByID(productoID) {
        const idProd = this.getProdByID(productoID.id_prod) 
        const idCarrito = productoID.id
        const arrayTmpCarritos = JSON.parse(fs.readFileSync(archivoCarritos, 'utf-8'))
        
            if (idProd.error == 'producto no encontrado'){
                return idProd
            } else {
                const element = arrayTmpCarritos.findIndex((cont) => cont.id == idCarrito)
                //console.log('saveID 1: ' + element)
                if  (arrayTmpCarritos[element] == undefined) {
                    return {error: "Carrito no encontrado"}
                } else {
                    arrayTmpCarritos[element].producto.push(idProd)
                    this.saveFile(arrayTmpCarritos)
                    return arrayTmpCarritos[element]
                }
            }
    }

    //Obtiene el prodcuto del archivo Prodcutos.txt de acuerdo al id de producto
    getProdByID(ids) {
        const Productos =  JSON.parse(fs.readFileSync(archivoProductos))
        const element = Productos.findIndex((cont) => cont.id == ids)

            if (element == "-1") {
                return ({ error : 'producto no encontrado' })
            } else {
                return Productos[element] 
            }
    }

    //Elimina el producto elegido dentro del carrito
    deleteByProdID(productoID) {
        const idProd = productoID.id_prod
        const idCarrito = productoID.id
        const arrayTmpCarritos = JSON.parse(fs.readFileSync(archivoCarritos, 'utf-8'))
        const elementCarrito = arrayTmpCarritos.findIndex((cont) => cont.id == idCarrito)

            if (arrayTmpCarritos[elementCarrito] == undefined) {
                return {error: "No se puede borrar, el carrito no existe"}
            } else  {
                const element = arrayTmpCarritos[elementCarrito].producto.findIndex((cont) => cont.id == idProd)
                if (element == '-1' ) {
                    return {error: "Producto en el carrito no encontrado"}
                } else {
                    arrayTmpCarritos[elementCarrito].producto.splice(element, 1)
                    this.saveFile(arrayTmpCarritos)
                    return {info:  "Producto borrado del carrito"}
                }
            }
    }

    //Obtiene todos los productos del carrito
    getAll(idCarrito) {
        const arrayTmpCarritos = JSON.parse(fs.readFileSync(archivoCarritos, 'utf-8'))
        //console.log('getAll 1: ' + arrayTmpCarritos.producto)
        const elementCarrito = arrayTmpCarritos.findIndex((cont) => cont.id == idCarrito)
        //console.log('getAll 2: ' + arrayTmpCarritos[elementCarrito].producto)

            if (arrayTmpCarritos[elementCarrito] == undefined) {
                return {error: "El carrito no existe"}
            } else  {
                console.log('getAll 2: ' + arrayTmpCarritos[elementCarrito].producto)
                if (arrayTmpCarritos[elementCarrito].producto == '' ) {
                    return {error: "El carrito no tiene productos cargados"}
                } else {
                    return arrayTmpCarritos[elementCarrito].producto
                }
            }
    }
       
     //Funcion de guardado en archivo
    async saveFile(content) {
        await fs.promises.writeFile(archivoCarritos, JSON.stringify(content, null, 2))
         .then (() => {console.log('Escritura exitosa')})
         .catch (error => console.log(`error escritura ${error}`))
    }

}

module.exports = {ContenedorCarrito}