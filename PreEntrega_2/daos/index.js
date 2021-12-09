export async function PersistenciaProductos(persistencia) {
    if (persistencia == 'Memoria') {
            const {default: conte} = await import('../daos/Productos/ProductosDaoMemoria.js')
            return new conte.ContenedorProductos()
        } else if (persistencia == 'Archivos'){ 
            const {default: conte} = await import('../daos/Productos/ProductosDaoArchivos.js')
            return new conte.ContenedorProductos()
        } else if (persistencia == 'MongoDB') { 
            const {default: conte} = await import('../daos/Productos/ProductosDaoMongoDB.js')
            return new conte.ContenedorProductos()
        } else if (persistencia == 'FireBase') { 
            const {default: conte} = await import('../daos/Productos/ProductosDaoFireBase.js')
            return new conte.ContenedorProductos()
        } else { 
            const {default: conte} = await import('../daos/Productos/ProductosDaoArchivos.js')
            return new conte.ContenedorProductos()
        }
    }

export async function PersistenciaCarritos(persistencia) {
        if (persistencia == 'Memoria') {
                const {default: conte} = await import('../daos/Carritos/CarritoDaoMemoria.js')
                return new conte.ContenedorCarrito()
            } else if (persistencia == 'Archivos'){ 
                const {default: conte} = await import('../daos/Carritos/CarritoDaoArchivos.js')
                return new conte.ContenedorCarrito()
            } else if (persistencia == 'MongoDB') { 
                const {default: conte} = await import('../daos/Carritos/CarritoDaoMongoDB.js')
                return new conte.ContenedorCarrito()
            } else if (persistencia == 'FireBase') { 
                const {default: conte} = await import('../daos/Carritos/CarritoDaoFireBase.js')
                return new conte.ContenedorCarrito()
            } else { 
                const {default: conte} = await import('../daos/Carritos/CarritoDaoArchivos.js')
                return new conte.ContenedorCarrito()
            }
    }
    
