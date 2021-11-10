const knexLib = require('knex')

class ChatSql {
  constructor(config) {
    this.knex = knexLib(config)
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists('chathistorial')
      .finally(() => {
        return this.knex.schema.createTable('chathistorial', table => {
          table.increments('id').primary();
          table.string('email', 50).notNullable();
          table.date('fechayhora');
          table.string('texto', 250);
        })
      })
  }

  insertarChats(mensajes) {
    return this.knex('chathistorial').insert(mensajes)
  }

  listarChats() {
    return this.knex('chathistorial').select('*')
  }

  close() {
    this.knex.destroy();
  }
}

module.exports = ChatSql