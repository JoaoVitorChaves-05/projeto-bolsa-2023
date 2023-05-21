import { Router } from 'express'
import AboutController from '../controllers/about.controller.js'
import auth from '../middlewares/auth.js'

const router = new Router()

router.get('/about', auth.authenticate, AboutController.index)

export default router