import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import Auth from '../middlewares/auth.js'
const router = new Router()

router.get('/login', AuthController.login)
router.post('/login', Auth.createSession, AuthController.Homepage)

router.get('/signUp', AuthController.signUp)
router.post('/signUp', AuthController.Loginpage)

router.delete('/login', Auth.deleteSession, AuthController.Homepage)

export default router