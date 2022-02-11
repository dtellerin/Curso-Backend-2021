import knexLib from 'knex'

class ArticulosSql {
  constructor(config) {
    this.knex = knexLib(config)
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists('articulos')
      .finally(() => {
        return this.knex.schema.createTable('articulos', table => {
          table.increments('id').primary();
          table.string('nombre', 50).notNullable();
          table.float('precio');
          table.string('imagen');
        })
      })
  }

  insertarArticulos(articulos) {
    return this.knex('articulos').insert(articulos)
  }

  listarArticulos() {
    return this.knex('articulos').select('*')
  }

  borrarArticuloPorId(id) {
    return this.knex.from('articulos').where('id', id).del()
  }

  actualizarStockPorId(stock, id) {
    return this.knex.from('articulos').where('id', id).update({ stock: stock })
  }

  close() {
    this.knex.destroy();
  }
}

export default ArticulosSql