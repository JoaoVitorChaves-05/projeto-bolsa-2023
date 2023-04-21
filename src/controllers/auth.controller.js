import database from "../database/database.js"
import bcryptjs from "bcryptjs"
import auth from "../middlewares/auth.js"

class AuthController {

    login(req, res) {
        res.status(200).render('auth/login', { message: null})
    }

    signUp(req, res) {
        res.status(200).render('auth/signUp')
    }

    async updateProfile(req, res) {
        const user_id = res.locals.user_id

        if (res.locals.auth && (!data.name.trim() || !data.email.trim() || !data.n_matricula.trim())) {
            const data = req.body

            if (data.password) {
                const password_hash = bcryptjs.hashSync(data.password)

                await database.models.Users.update({ name: data.name, email: data.email, n_matricula: data.n_matricula, password_hash: password_hash}, {
                    where: { user_id: user_id }
                })

                res.status(200).render('auth/profile')
                return
            }
            
            await database.models.Users.update({ name: data.name, email: data.email, n_matricula: data.n_matricula}, {
                where: { user_id: user_id }
            })

            return
        }
    }

    async profile(req, res) {
        const user_id = res.locals.user_id

        if (res.locals.auth) {
            const result_user = await database.models.Users.findOne({ where: { user_id: user_id } })
            const result_posts = await database.models.Posts.findAll({
                attributes: ['post_id', 'user_author_id', 'origin', 'destiny', 'departure_time', 'contact', 'car_id', 'createdAt', 'updatedAt'], 
                where: { user_author_id: user_id } 
            })
    
            const user = result_user ? {...result_user.dataValues, password_hash: null} : null
            const posts = result_posts ? (() => {
                let arr = []
                result_posts.forEach(post => arr.push(post.dataValues))
                return arr
            })() : null

            console.log(posts)

            res.status(200).render('auth/profile', { user: user, posts: posts })
            return
        }

        res.redirect('/login')
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

    async deleteProfile(req, res) {
        const user_id = res.locals.user_id

        if (user_id) {
            await database.models.Posts.destroy({ where: {user_author_id: user_id} })
            res.redirect('/')
            return
        } 

        res.status(200).json({ message: 'Erro ao deletar o usuário, verifique se há autenticação'})
    }

}

export default new AuthController()