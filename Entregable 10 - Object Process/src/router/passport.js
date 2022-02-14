import passport  from 'passport'
import LocalStrategy from 'passport-local'
import {createHash, isValidPassword} from './auth.js'
import { PersistenciaUsuarios} from '../../daos/index.js'


const usuarios = await PersistenciaUsuarios()
let user = []

/* ------------------ PASSPORT -------------------- */
passport.use('register', new LocalStrategy({
    passReqToCallback: true
    }, async (req, username, password, done) => {
  
        const { direccion } = req.body
        const role = 'cliente'
        const usuario = await usuarios.getByUser(username)
  
        if (usuario) {
          return done('already registered')
        }
          password = createHash(password)
          user = Object.assign({usuario: username}, {password: password}, {email: direccion}, {role: role})
          user = await usuarios.addUser(user)
      return done(null, user)
  }))
  
  passport.use('login', new LocalStrategy( async (username, password, done) => {
      user = await usuarios.getByUser(username)
    
       if (!user) {
        return done(null, false)
      }
  
      if (!isValidPassword(user, password)) {
        return done(null, false);
      }
  
    //user.contador = 0
    console.log('Login1: ' + JSON.stringify(user))
    //return user
    return done(null, user)
  
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  
  passport.deserializeUser(async (id, done) => {
    const usuario = await usuarios.getByUserId(id)
    done(null, usuario)
  })

export default passport

