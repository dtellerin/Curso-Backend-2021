import dotenv from 'dotenv'
dotenv.config({ path: `./config/config.env` })

export const optionsMariaDB = {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: process.env.USER_MARIADB,
      password: process.env.PASS_MARIADB,
      database: 'productos'
    }
  }

