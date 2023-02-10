/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return '<h1 style="text-align:center; margin:5% 0">Go Back Bro!</h1>'
})
Route.group(() => {
  Route.post('login', 'Auth/AuthController.login').as('login')
  Route.post('register', 'Auth/AuthController.register').as('register')
  Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly()
    Route.resource('posts', 'PostsController').apiOnly()
    Route.resource('comments', 'CommentsController').apiOnly()
    Route.resource('categories', 'CategoriesController').apiOnly()
  }).middleware('auth')
}).prefix('api')
