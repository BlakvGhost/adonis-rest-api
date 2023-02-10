import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { Utils } from 'App/Utils/Utils'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return await User.all()
  }

  public async store({ request }: HttpContextContract) {

    const payload = await request.validate(CreateUserValidator)
    const cover = await Utils.save_image(request, 'avatar')

    return await User.create({...payload, ...cover})
  }

  public async show({ params }: HttpContextContract) {
    return await User.findOrFail(params.id)
  }

  public async update({params, request}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validate(CreateUserValidator)
    const cover = await Utils.save_image(request, 'avatar')

    return await user.merge({...payload, ...cover??user.avatar}).save()
  }

  public async destroy({params}: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user.delete()
  }

}
