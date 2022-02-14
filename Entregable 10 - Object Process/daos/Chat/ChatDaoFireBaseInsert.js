import {ChatDAO, productosDAO} from '../../config/cfgFirebase.js'
//import admin from 'firebase-admin'

// const Chats = [
//     {
//         "author": {
//           "id": "maria@coder.com",
//           "nombre": "Maria",
//           "apellido": "Pompin",
//           "edad": 32,
//           "alias": "mapom",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/diversity-avatars-volume-01-v2/64/detective-woman-white-32.png"
//         },
//         "text": "Buenos días",
//         "ts": 1640010250
//       },
//       {
//         "author": {
//           "id": "david@coder.com",
//           "nombre": "David",
//           "apellido": "Zarate",
//           "edad": 38,
//           "alias": "daza",
//           "avatar": "https://cdn3.iconfinder.com/data/icons/hand-drawn-avatars/500/Avatars-17-32.png"
//         },
//         "text": "Todo bien por acá, uds?",
//         "ts": 1640010260
//       },
//       {
//         "author": {
//           "id": "pepe@coder.com",
//           "nombre": "Pedro",
//           "apellido": "Carpincho",
//           "edad": 41,
//           "alias": "peca",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/dog-avatars/192/avatars-dog-bernese-mountain-dog-32.png"
//         },
//         "text": "Todo bien.",
//         "ts": 1640010270
//       },
//       {
//         "author": {
//           "id": "pepe@coder.com",
//           "nombre": "Pedro",
//           "apellido": "Carpincho",
//           "edad": 41,
//           "alias": "peca",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/dog-avatars/192/avatars-dog-bernese-mountain-dog-32.png"
//         },
//         "text": "Alguien sabe si hay clases?",
//         "ts": 1640010280
//       },
//       {
//         "author": {
//           "id": "david@coder.com",
//           "nombre": "David",
//           "apellido": "Zarate",
//           "edad": 38,
//           "alias": "daza",
//           "avatar": "https://cdn3.iconfinder.com/data/icons/hand-drawn-avatars/500/Avatars-17-32.png"
//         },
//         "text": "Ni idea, espero que sí",
//         "ts": 1640010290
//       },
//       {
//         "author": {
//           "id": "maria@coder.com",
//           "nombre": "Maria",
//           "apellido": "Pompin",
//           "edad": 32,
//           "alias": "mapom",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/diversity-avatars-volume-01-v2/64/detective-woman-white-32.png"
//         },
//         "text": "Si hay, por favor les pido que la graben, estoy con mucho trabajo",
//         "ts": 1640010300
//       },
//       {
//         "author": {
//           "id": "david@coder.com",
//           "nombre": "David",
//           "apellido": "Zarate",
//           "edad": 38,
//           "alias": "daza",
//           "avatar": "https://cdn3.iconfinder.com/data/icons/hand-drawn-avatars/500/Avatars-17-32.png"
//         },
//         "text": "Dale",
//         "ts": 1640010310
//       },
//       {
//         "author": {
//           "id": "pepe@coder.com",
//           "nombre": "Pedro",
//           "apellido": "Carpincho",
//           "edad": 41,
//           "alias": "peca",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/dog-avatars/192/avatars-dog-bernese-mountain-dog-32.png"
//         },
//         "text": "Dale, y te la pasamos.",
//         "ts": 1640010320
//       },
//       {
//         "author": {
//           "id": "maria@coder.com",
//           "nombre": "Maria",
//           "apellido": "Pompin",
//           "edad": 32,
//           "alias": "mapom",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/diversity-avatars-volume-01-v2/64/detective-woman-white-32.png"
//         },
//         "text": "Gracias, es que tengo cosas que entregar esta semana.",
//         "ts": 1640010330
//       },
//       {
//         "author": {
//           "id": "pepe@coder.com",
//           "nombre": "Pedro",
//           "apellido": "Carpincho",
//           "edad": 41,
//           "alias": "peca",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/dog-avatars/192/avatars-dog-bernese-mountain-dog-32.png"
//         },
//         "text": "Despreocupate, todo bien.",
//         "ts": 1640010340
//       },
//       {
//         "author": {
//           "id": "maria@coder.com",
//           "nombre": "Maria",
//           "apellido": "Pompin",
//           "edad": 32,
//           "alias": "mapom",
//           "avatar": "https://cdn1.iconfinder.com/data/icons/diversity-avatars-volume-01-v2/64/detective-woman-white-32.png"
//         },
//         "text": "Gracias chicos.",
//         "ts": 1640010350
//       }
// ]

// Chats.forEach(chat => {
//     const res = ChatDAO.add(chat)
//     console.log (`inserto: ${JSON.stringify(chat)} con ID: ${res.id}`)
// }) 

const snapshot = await ChatDAO.orderBy('ts').get()
snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().text);
  })
//console.log (Chats)

//ChatDAO.doc(set(Chats))

