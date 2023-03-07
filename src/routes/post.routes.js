import { Router } from 'express'
import PostController from '../controllers/post.controller.js'
import Auth from '../middlewares/auth.js'

const router = new Router()

router.get('/post', Auth.authenticate, PostController.index)
router.post('/post', Auth.authenticate, PostController.addPost)

export default router