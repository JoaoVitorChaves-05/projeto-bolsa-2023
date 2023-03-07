import { Router } from 'express'
import AboutController from '../controllers/about.controller.js'

const router = new Router()

router.get('/about', AboutController.index)

export default router