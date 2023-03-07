
class AuthController {

    login(req, res) {
        res.status(200).render('auth/login')
    }

    signUp(req, res) {
        res.status(200).render('auth/signUp')
    }

    Homepage(req, res) {
        res.redirect('/')
    }

    Loginpage(req, res) {
        res.redirect('/login')
    }
}

export default new AuthController()