import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment('Blog post comments')
      table.increments('id').unique()
      table.text('content')
      table.integer('post_id')
        .unsigned()
        .references('posts.id')
        .onDelete('CASCADE')
        .nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
