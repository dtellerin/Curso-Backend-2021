import express, { Router } from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import {PersistenciaSesiones} from '../../daos/index.js'
import {optionsMongDB} from '../../config/cfgMongoDB.js' 
import {isAuth} from './auth.js'
import passport from './passport.js'

const sesiones = await PersistenciaSesiones()
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const routerSesiones = Router()

/* --------------------- MIDDLEWARE --------------------------- */

routerSesiones.use(session({
    store: MongoStore.create({
      mongoUrl: optionsMongDB.uri,
      mongoOptions: advancedOptions
  }),
      secret: 'shhhhhhhhhhhhhhhhhhhhh',
      resave: false,
      saveUninitialized: false,
      cookie: {
      maxAge: 600000
  }
}))

routerSesiones.use(passport.initialize());
routerSesiones.use(passport.session());
routerSesiones.use(express.json())

/* --------------------- ROUTES --------------------------- */


routerSesiones.get('/register', (req, res) => {
  res.render('register')
})

routerSesiones.post('/register', passport.authenticate('register', { failureRedirect: './failregister', successRedirect: './' }))

routerSesiones.post('/login', passport.authenticate('login', { failureRedirect: './faillogin', successRedirect: './main' }))

routerSesiones.get('/', async (req, res) => {
  const sessiones = await sesiones.getByID(req.sessionID)
  if (sessiones == null ) {
    res.render('indexLogin') }
  else {
    res.redirect('/api/sesion/main')
   }
})

routerSesiones.get('/main', isAuth, (req, res) => {
  const nombre =  req.user.usuario
  res.render('mainPage', {nombre})
})

routerSesiones.get('/faillogin', (req, res) => {
  res.render('login-error');
})

routerSesiones.get('/failregister', (req, res) => {
  res.render('register-error');
})

routerSesiones.get('/logout', (req, res) => {
    const nombre = req.user.usuario
    req.session.destroy(err => {
        if (!err) res.render('logout', {nombre})
        else res.send({ error: 'olvidar', body: err })
    })
})


export default routerSesiones



