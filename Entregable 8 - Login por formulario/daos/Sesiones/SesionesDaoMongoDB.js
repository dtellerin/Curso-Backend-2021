import {optionsMongDB, sesionesCliente} from '../../config/cfgMongoDB.js'  //archivo de configuracion
import mongoose from 'mongoose'
const sesionesDAO = mongoose.model('sessions', sesionesCliente)

class ContenedorSesiones {

    async connectDB() {
        await   mongoose.connect(optionsMongDB.uri, {
                serverSelectionTimeoutMS: optionsMongDB.timeoutConnect,
        })
        console.log('Base de datos conectada')
    }

    async disconnectDB() {
        await mongoose.disconnect()
        console.log('Base de datos desconectada')    
    }

    //Obtiene un producto partuclar por su id del archivo
    async getByID(sessionid) {
        await this.connectDB()
        const contenido = await sesionesDAO.findOne({ _id: sessionid}, {_id: 0} )
        console.log('getById: ' + contenido)
        if (contenido == '') {
            this.disconnectDB()
            return ({ error : 'producto no encontrado' })
        } else {
            this.disconnectDB()
            return contenido
        }
    }

}

export default {ContenedorSesiones}