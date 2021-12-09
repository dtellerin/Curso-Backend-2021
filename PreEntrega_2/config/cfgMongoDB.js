import mongoose from 'mongoose'

export const optionsMongDB = { 
    uri: "mongodb+srv://admin:admin9887@cluster0.1t3wi.mongodb.net/ecommerce?retryWrites=true&w=majority",
    timeoutConnect: '5000'
    }

export let contenidoCarrito = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    producto: { type: Object, required: false }
    })

export let contenidoProductos = new mongoose.Schema({
    title: { type: String, required: true },
    descripcion: { type: String, required: true },
    code: { type: String, required: true },
    thumbail:  { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    id: { type: Number, required: true },
    timestamp: {type: Number, required: true}
})

