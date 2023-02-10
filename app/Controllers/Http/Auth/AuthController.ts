import { Utils } from 'App/Utils/Utils';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import CreateUserValidator from 'App/Validators/CreateUserValidator';

export default class AuthController {
public async login({ request, auth }: HttpContextContract) {

    const email = request.input("email");
    const password = request.input("password");

    const token = await auth.use("api").attempt(email, password, {
        expiresIn: "10 days",
        });
        return token.toJSON();
    }

    public async register({ request, auth }: HttpContextContract) {
      const payload = await request.validate(CreateUserValidator)
      let avatar =  Utils.save_image(request, 'avatar')
      const user = await User.create({...payload, ...avatar})

      const token = await auth.use("api").login(user, {
        expiresIn: "10 days",
      });

      return token.toJSON();
    }

}
