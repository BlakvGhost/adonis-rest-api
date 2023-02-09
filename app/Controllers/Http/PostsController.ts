import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({request, response, auth}: HttpContextContract) {
    return {
      posts: await Post.query().select('*')
    }
  }
  public async store({request}: HttpContextContract) {

  }
}
