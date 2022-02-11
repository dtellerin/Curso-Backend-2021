import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import {PersistenciaSesiones} from '../../daos/index.js'
import { Router } from 'express'
import {optionsMongDB} from '../../config/cfgMongoDB.js'  //archivo de configuracion

const sesiones = await PersistenciaSesiones()

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const routerSesiones = Router()

// routerSesiones.use(express.urlencoded({ extended: true }))
// routerSesiones.use(express.static('public'))

 routerSesiones.use(session({
    store: MongoStore.create({
        mongoUrl: optionsMongDB.uri,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false ,
    cookie: {
        maxAge: 600000
    } 
 }))

 let nombre = ''
const getNombreSession = req => req.session.nombre ? req.session.nombre : ''

routerSesiones.get('/', async (req, res) => {
    const sessiones = await sesiones.getByID(req.sessionID)
    console.log('sesiones: Paso 1' + sessiones + ', sessionID: ' + req.sessionID)
    if (sessiones == null ) {
        res.render('indexLogin') }
     else {
        res.redirect('/api/login/main')
     }
 })
 
 routerSesiones.get('/main', (req, res) => {
   nombre =  getNombreSession(req)
   console.log('sesiones: Paso 4', req.session.nombre)
    res.render('mainPage', {nombre})
})

 routerSesiones.post('/login', (req, res) => {
    console.log('sesiones: Paso 2 ' + req.body.nombre)
    req.session.nombre =  req.body.nombre
    console.log('sesiones: Paso 3 ' + req.session.nombre)
    res.redirect('/api/login/main')
})
 

routerSesiones.get('/logout', (req, res) => {
    let nombre = getNombreSession(req)
    req.session.destroy(err => {
        if (!err) res.render('logout', {nombre})
        else res.send({ error: 'olvidar', body: err })
    })
})


export default routerSesiones



