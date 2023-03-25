import database from "../database/database.js"
import bcryptjs from "bcryptjs"

class AuthController {

    login(req, res) {
        res.status(200).render('auth/login')
    }

    signUp(req, res) {
        res.status(200).render('auth/signUp')
    }

    async createUser(req, res) {
        const { Users } = database.models
        const { name, email, password, n_matricula } = req.body
    
        if (!name.trim() || !email.trim() || !password.trim() || !n_matricula.trim()) {
            res.status(200).render('auth/signUp')
            return
        }
    
        const password_hash = bcryptjs.hashSync(password)
    
        try {
            await Users.create({
                name: name,
                email: email,
                password_hash: password_hash,
                n_matricula: n_matricula
            })
    
            res.status(200).render('auth/login', { message: 'Usuário criado com sucesso! Efetue login para continuar' })
        } catch (err) {
            console.log(err)
            res.status(500).send('Ocorreu um erro ao criar o usuário')
        }
    }

    Homepage(req, res) {
        res.redirect('/')
    }

    Loginpage(req, res) {
        res.redirect('/login')
    }
}

export default new AuthController()