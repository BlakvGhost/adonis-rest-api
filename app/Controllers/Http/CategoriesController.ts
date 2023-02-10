
import { BaseController } from 'App/Controllers/BaseController'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController extends BaseController {
  public async index({}: HttpContextContract) {
    return await Category.all()
    //return response.json(categorys)
  }

  public async store({ request }: HttpContextContract) {
    const cat = new Category()
    cat.label = request.input('label')
    cat.desc = request.input('desc')

    return await cat.save()
  }

  public async show({ params }: HttpContextContract) {
    return await Category.findOrFail(params.id)
  }

  public async update({ params, request}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    category.label = request.input('label')
    category.desc = request.input('desc')

    return await category.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    return category.delete()
  }
}
