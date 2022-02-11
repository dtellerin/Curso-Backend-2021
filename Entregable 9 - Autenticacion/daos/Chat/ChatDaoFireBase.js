import {ChatDAO} from '../../config/cfgFirebase.js'

class ContenedorCarrito {

    //Agrega un nuevo chat
    async saveChat(mensaje) {
        const ts = Math.floor(Date.now()/1000)
        try {
            await ChatDAO.add(mensaje)
            const mensajesChat = await this.getAll()
            return (mensajesChat)
        } catch (error) {
            return {error: `No se pudo agregar el chat, error: ${error}`}
        }
    }

    //Obtiene todos los chats
    async getAll() {
        try {
            const mensajesChat = []
            const mensajes = await ChatDAO.orderBy('ts').get()
            mensajes.forEach(doc => {
                mensajesChat.push(doc.data())
            })
            return mensajesChat
        } catch (error) {
            return {error: `Error al buscar chats ${error}`} 
        }

    }
       
}
export default {ContenedorCarrito}