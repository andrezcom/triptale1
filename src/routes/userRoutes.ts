import express from 'express'
import * as userController from '../controllers/userController'

const userRoutes = express.Router()

userRoutes.post('/newuser', userController.createUserController)
userRoutes.get('/', userController.getAllUserController)
userRoutes.get('/:id', userController.findUserById)
userRoutes.delete('/:id', userController.deleteUserController)
userRoutes.put('/', userController.editUserController)

export default userRoutes
