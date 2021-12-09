import fetch  from 'node-fetch'
let contenidoCarrito = []
let lastId = []
let arrayCarritos = []


class ContenedorCarrito {
    
    //Agrega un nuevo carrito
    newCarrito() {
        const ts = Math.floor(Date.now()/1000)
            if (arrayCarritos == '') {
                lastId = 1
            } else{
                 const element = arrayCarritos.map((item) => item.id)
                lastId =  parseInt(element.sort((a, b) => a - b).pop()) + 1
            }

        contenidoCarrito = Object.assign({id: lastId}, {timestamp: ts}, {producto: []})
        arrayCarritos.push(contenidoCarrito)
        return ({id: lastId})
    }

    //Borra el carrito de acuerdo al id
    deleteByID(ids) {

        //const arrayCarritos = JSON.parse(fs.readFileSync(archivoCarritos))
        if (arrayCarritos == '') {
                return ({error: 'No hay carritos para borrar'})
        } else {
            const element = arrayCarritos.findIndex((cont) => cont.id == ids)
               if (element == -1) {
                    return ({ error : 'Carrito no encontrado' })
                } else {
                    arrayCarritos.splice(element, 1)
                    return ({error: "Carrito borrado"})    
                }
            }
    }

    async saveByID(productoID) {
        
        const idProd = await this.getProdByID(productoID.id_prod) 
        const idCarrito = productoID.id
        
        if (idProd.error == 'producto no encontrado' || idProd.error == "No hay productos cargados") {
            return idProd
            }
        
         const elementCarrito = arrayCarritos.findIndex((cont) => cont.id == idCarrito)
        if  (arrayCarritos[elementCarrito] == undefined) {
            return {error: "Carrito no encontrado"}
        } else {
            arrayCarritos[elementCarrito].producto.push(idProd)
            return arrayCarritos
        }
    }

    
    //Obtiene el prodcuto del archivo Prodcutos.txt de acuerdo al id de producto
    async getProdByID(ids) {
        //let Productos = []
        let sets = { method: "Get"}
        let Productos = await fetch('http://localhost:8080/api/productos', sets)
            .then(response => response.json())
            .then(data => {
               return data
            })

        if (Productos.error == "No hay productos cargados") {
            return Productos
        } 
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
        const elementCarrito = arrayCarritos.findIndex((cont) => cont.id == idCarrito)

        if (arrayCarritos[elementCarrito] == undefined) {
            return {error: "No se puede borrar, el carrito no existe"}
        } else  {
            const element = arrayCarritos[elementCarrito].producto.findIndex((cont) => cont.id == idProd)
            if (element == '-1' ) {
                return {error: "Producto en el carrito no encontrado"}
            } else {
                arrayCarritos[elementCarrito].producto.splice(element, 1)
                return {info:  "Producto borrado del carrito"}
            }
        }
    }

    //Obtiene todos los productos del carrito
    getAll(idCarrito) {
        const elementCarrito = arrayCarritos.findIndex((cont) => cont.id == idCarrito)

        if (arrayCarritos[elementCarrito] == undefined) {
            return {error: "El carrito no existe"}
        } else  {
            if (arrayCarritos[elementCarrito].producto == '' ) {
                return {error: "El carrito no tiene productos cargados"}
            } else {
                return arrayCarritos[elementCarrito].producto
            }
        }

    }
}
export default {ContenedorCarrito}