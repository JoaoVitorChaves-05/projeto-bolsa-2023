import { Router } from 'express'
import HomeController from '../controllers/home.controller.js'
import auth from '../middlewares/auth.js'

const router = new Router()

router.get('/', auth.authenticate, HomeController.index)

export default router