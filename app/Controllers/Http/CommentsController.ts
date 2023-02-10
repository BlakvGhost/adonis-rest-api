import { schema } from '@ioc:Adonis/Core/Validator';
import { BaseController } from 'App/Controllers/BaseController';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class CommentsController extends BaseController {

  public async store({ request }: HttpContextContract) {
    const postSchema = schema.create({
      post_id: schema.string(),
      content: schema.string(),
    })
    const payload = await request.validate({ schema: postSchema })

    const post = await Post.findOrFail(request.input('post_id'))
    return await post.related('comments').create(payload)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
