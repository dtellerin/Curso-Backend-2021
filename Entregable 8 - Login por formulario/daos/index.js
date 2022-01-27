const persistencia = 'MongoDB'

export async function PersistenciaProductos() {
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

export async function PersistenciaCarritos() {
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

    export async function PersistenciaChat() {
        if (persistencia == 'Memoria') {
                const {default: conte} = await import('../daos/Chat/ChatDaoMemoria.js')
                return new conte.ContenedorCarrito()
            } else if (persistencia == 'Archivos'){ 
                const {default: conte} = await import('../daos/Chat/ChatDaoArchivos.js')
                return new conte.ContenedorCarrito()
            } else if (persistencia == 'MongoDB') { 
                const {default: conte} = await import('../daos/Chat/ChatDaoMongoDB.js')
                return new conte.ContenedorCarrito()
            } else if (persistencia == 'FireBase') { 
                const {default: conte} = await import('./Chat/ChatDaoFireBase.js')
                return new conte.ContenedorCarrito()
            } else { 
                const {default: conte} = await import('../daos/Chat/ChatDaoArchivos.js')
                return new conte.ContenedorCarrito()
            }
    }
    
    export async function PersistenciaSesiones() {
        const {default: conte} = await import('./Sesiones/SesionesDaoMongoDB.js')
        return new conte.ContenedorSesiones()
    }

