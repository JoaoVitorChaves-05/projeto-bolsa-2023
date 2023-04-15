import database from "../database/database.js"
import bcryptjs from "bcryptjs"

class AuthController {

    login(req, res) {
        res.status(200).render('auth/login', { message: null})
    }

    signUp(req, res) {
        res.status(200).render('auth/signUp')
    }

    async profile(req, res) {
        const user_id = res.locals.user_id

        const result = await database.models.Users.findOne({ where: { user_id: user_id } })

        const user = {...result.dataValues}
        user.password_hash = null

        res.status(200).render('auth/profile', { user: user })
    }

    async createUser(req, res) {
        const { Users } = database.models
        const { name, email, password, n_matricula } = req.body
    
        if (!name.trim() || !email.trim() || !password.trim() || !n_matricula.trim()) {
            res.status(200).render('auth/signUp', { message: 'Ops! Ocorreu um erro. Tente novamente mais tarde.' })
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
    
            res.status(200).render('auth/login', { message: 'Usuário criado com sucesso! Efetue login para continuar.' })
        } catch (err) {
            console.log(err)
            res.status(500).send('Ocorreu um erro ao criar o usuário')
        }
    }

    async updateProfile(req, res) {
        const user_id = res.locals.user_id
        const dataToUpdate = req.body
    }

    async deleteProfile(req, res) {}

}

export default new AuthController()