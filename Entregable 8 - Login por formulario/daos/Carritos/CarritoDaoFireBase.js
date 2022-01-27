import {carritosDAO, productosDAO} from '../../config/cfgFirebase.js'
import admin from 'firebase-admin'

class ContenedorCarrito {

    //Agrega un nuevo carrito
    async newCarrito() {
        let MaxCarritotId= 0
        let newId = 0
        let dataCarritos = []
        try {
            dataCarritos = await carritosDAO.orderBy('id', 'desc').limit(1).get()
            dataCarritos.forEach(doc => {
                MaxCarritotId = doc.data().id
            })
        } catch (error) { 
            return {error: `No se pudo obtener datos del carrito: ${error}`}
        }
       
        if (MaxCarritotId == '') {
                newId = 1
        } else {
                newId = MaxCarritotId + 1
        }

        const ts = Math.floor(Date.now()/1000)
        //const productos = []    
        const newProd = Object.assign({id: newId}, {timestamp: ts}) 
        try {
            await carritosDAO.doc(newId.toString()).set(newProd) // inserta el siguiente producto incrementadno el id
                return newProd
        } catch (error) { 
                return {error: `No se pudo agregar el nuevo producto: ${error}`}
            }
        }
    

    //Borra el carrito de acuerdo al id
    async deleteByID(ids) {
        try {
            await carritosDAO.doc(ids.toString()).delete()
            return {info: `Carrito con Id: ${ids} borrado`}
        } catch (error) { 
            return {error: `No se pudo borrar el producto: ${error}`}
        }
    }
    

    //Agrega prodcutos al carrito
    async saveByID(productoID) {
        let ProdById = await this.getProdByID(productoID.id_prod) 
        
        if (ProdById.error == 'No se pudo obtener datos' || ProdById.error == 'No hay productos cargados con el id' ){
            return ProdById
        } else {
            try{
                await carritosDAO.doc(productoID.id.toString()).update({
                    producto: admin.firestore.FieldValue.arrayUnion(ProdById[0])
                })
                return {info: "Producto agregado al carrito"}
            } catch (error) { 
                return {error: `No se pudo agregar: ${error}`}
            } 
        }
    }
        
    //Obtiene el producto de acuerdo a su id
    async getProdByID(ids) {
        let Productos = []
        let dataProductos = []
        try {
            dataProductos = await productosDAO.where('id', '==', Number(ids)).get()
            dataProductos.forEach(doc =>{ 
                    Productos.push(Object.assign({id: doc.id}, doc.data()))
                }) 
        } catch (error) { 
                return {error: `No se pudo obtener datos`}
        }

        if (Productos == '') {
            return {error: `No hay productos cargados con el id`}
        } else {
            return Productos
        } 
    }

    //Elimina el producto elegido dentro del carrito
    async deleteByProdID(productoID) {
        let ProdById = await this.getProdByID(productoID.id_prod) 
        try {
            await carritosDAO.doc(productoID.id.toString()).update({
                producto: admin.firestore.FieldValue.arrayRemove(ProdById[0])
            })
            return {info: `Producto con Id: ${productoID.id_prod} borrado`}
        } catch (error) { 
            return {error: `No se pudo borrar el producto: ${error}`}
        }
    }


    //Obtiene todos los productos del carrito
     async getAll(idCarrito) {
        let Carrito = []
        let dataCarrito = []
        try {
            dataCarrito = await carritosDAO.where('id', '==', Number(idCarrito)).get()
            dataCarrito.forEach(doc =>{ 
                Carrito.push(Object.assign({id: doc.id}, doc.data()))
                }) 
        } catch (error) { 
                return {error: `No se pudo obtener datos: ${error}`}
        }

        if (Carrito == '') {
            return {error: `No hay productos cargados con el id: ${idCarrito}`}
        } else {
            return Carrito
        } 
    }
       
}
export default {ContenedorCarrito}