import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import Auth from '../middlewares/auth.js'
const router = new Router()

router.get('/profile', Auth.authenticate, AuthController.profile)
router.put('/profile', Auth.authenticate, AuthController.updateProfile)
router.delete('/profile', Auth.authenticate, AuthController.deleteProfile)

router.get('/login', AuthController.login)
router.post('/login', Auth.createSession, (req, res) => res.redirect('/'))

router.get('/signUp', AuthController.signUp)
router.post('/signUp', AuthController.createUser)

router.delete('/login', Auth.deleteSession, (req, res) => res.redirect('/'))

export default router