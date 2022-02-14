import {productosDAO} from '../../config/cfgFirebase.js'
import fs from 'fs'
import ProductosDaoMongoDB from './ProductosDaoMongoDB.js'

const userAdmin = fs.readFileSync('./persistencia/UserAdmin.txt') //archivo para obtener si el user es Admin

class ContenedorProductos {

    //obtengo todos los productos en el archivo
    async getAll() {
        let Productos = []
        let dataProductos = []
        try {
            dataProductos = await productosDAO.orderBy('id').get()
            dataProductos.forEach(doc =>{ 
                //Productos.push(Object.assign({id: doc.id}, doc.data())) 
                Productos.push(Object.assign(doc.data()))
                console.log(Productos.title, '=>', Productos.thumbnail) 
                })
            } catch (error) { 
                return {error: `No se pudo obtener datos: ${error}`}
            }

        if (dataProductos == '') {
            return {error: "No hay productos cargados"}
        } else {
            console.log(JSON.stringify(Productos))
            return Productos
        } 
    }

    //Obtiene un producto partuclar por su id del archivo
     async getByID(ids) {
        if (userAdmin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            let Productos = []
            let dataProductos = []
            try {
                dataProductos = await productosDAO.where('id', '==', Number(ids)).get()
                dataProductos.forEach(doc =>{ 
                        Productos.push(Object.assign({id: doc.id}, doc.data()))
                    }) 
            } catch (error) { 
                    return {error: `No se pudo obtener datos: ${error}`}
            }
    
            if (Productos == '') {
                return {error: `No hay productos cargados con el id: ${ids}`}
            } else {
                return Productos
            } 
        }
     }
 
    //Guarda el id del nuevo producto y lo persiste en archivo
     async save(obj) {
         if (userAdmin == 'false') {
             return { error : -1, descripcion: 'ruta /api/productos metodo POST no autorizada'}
        } else {
            let MaxProductId= 0
            let newId = 0
            let dataProductos = []
            try {
                dataProductos = await productosDAO.orderBy('id', 'desc').limit(1).get()
                dataProductos.forEach(doc => {
                    MaxProductId = doc.data().id
                })
            } catch (error) { 
                return {error: `No se pudo obtener datos: ${error}`}
            }
           
            if (MaxProductId == '') {
                    newId = 1
            } else {
                    newId = MaxProductId + 1
            }

            const ts = Math.floor(Date.now()/1000)    
            const newProd = Object.assign({id: newId}, {timestamp: ts}, obj) 
            try {
                await productosDAO.doc(newId.toString()).set(newProd) // inserta el siguiente producto incrementadno el id
                    return newProd
            } catch (error) { 
                    return {error: `No se pudo agregar el nuevo producto: ${error}`}
                }
            }
        }
    

    //Borra el prodcuto por su Id y lo persiste en archivo
    async deleteByID(ids) {
        if (userAdmin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo DEL no autorizada'}
        } else {
            try {
                await productosDAO.doc(ids.toString()).delete()
                return {info: `Producto con Id: ${ids} borrado`}
            } catch (error) { 
                return {error: `No se pudo borrar el producto: ${error}`}
            }
        }
    }

    //Actualiza el producto por su id y lo persiste en archivo
    async updateByID(obj, ids) {
        if (userAdmin == 'false') {
            return { error : -1, descripcion: 'ruta /api/productos metodo GET no autorizada'}
        } else {
            try {
                const dataProductos = await productosDAO.doc(ids.toString()).get()
                if (!dataProductos.exists)  {
                    console.log('update 1: ', dataProductos.data())
                    return {error: `El producto con el id: ${ids} no existe`}
                } else {
                    try {
                    const newProducto = {title: obj.title.toString(),
                                        price: obj.price,
                                        thumbnail: obj.thumbail.toString(),
                                        code: obj.code.toString(),
                                        descripcion: obj.descripcion.toString(),
                                        stock: obj.stock
                                        }
                        await productosDAO.doc(ids.toString()).set(newProducto)
                        return {info: `El producto con el id: ${ids} fue actualizado`}
                    } catch (error) {
                        return {error: `No se pudo actualizar el producto, ${error}`}
                    } 
                } 
            }catch (error) {
                return {error: `No se pudo encontrar el producto, ${error}`}
            }
        }
    }
}

export default {ContenedorProductos}