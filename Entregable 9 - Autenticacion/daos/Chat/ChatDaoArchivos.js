import fs from 'fs'
const archivoChat = './persistencia/Chat.txt'
let arrayChat = []

class ContenedorCarrito {
 
    // Guarda el chat
    async saveChat(mensaje) {
        arrayChat = await this.getAll()
        
        if (arrayChat == ''){
            return mensajes
        } else {
            arrayChat.push(mensaje)
            await this.saveFile(arrayChat)
            return arrayChat
        }
    }
    
     //Obtiene todos los Chats del archivo
    getAll() {
        arrayChat = JSON.parse(fs.readFileSync(archivoChat, 'utf-8'))
        return arrayChat
    }
       
     //Funcion de guardado en archivo
    async saveFile(content) {
        await fs.promises.writeFile(archivoChat, JSON.stringify(content, null, 2))
         .then (() => {console.log('Escritura exitosa')})
         .catch (error => console.log(`error escritura ${error}`))
    }

}

export default {ContenedorCarrito}