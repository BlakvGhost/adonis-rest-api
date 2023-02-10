import { BaseController } from 'App/Controllers/BaseController'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { Utils } from 'App/Utils/Utils'
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostsController extends BaseController {
  public async index({}: HttpContextContract) {
    return await Post.query().preload('user').preload('comments').preload('category')
    //return response.json(posts)
  }

  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreatePostValidator)
    const cover = await Utils.save_image(request)

    return await Post.create({ ...payload, ...cover, userId: auth.user?.id })
  }

  public async show({ params }: HttpContextContract) {
    return await Post.query()
      .preload('comments')
      .preload('user')
      .preload('category')
      .where('id', params.id).first()
    // return await Post.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const payload = await request.validate(CreatePostValidator)
    const cover = await Utils.save_image(request)

    return await post.merge({ ...payload, ...cover}).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return post.delete()
  }
}
