import { Router } from 'express'
import PostController from '../controllers/post.controller.js'
import Auth from '../middlewares/auth.js'

const router = new Router()

router.get('/getPost', PostController.getPost)
router.get('/post', Auth.authenticate, PostController.index)
router.post('/post', Auth.authenticate, PostController.addPost)
router.put('/post', Auth.authenticate, PostController.updatePost)
router.delete('/post', Auth.authenticate, PostController.deletePost)

export default router