import admin from 'firebase-admin'
import serviceAccount from '../config/ecommercecoderhouse-741e2-firebase-adminsdk-qo7lu-b3be1e11be.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export let db = admin.firestore()
export const carritosDAO = db.collection('carritos')
export const productosDAO = db.collection('productos')


