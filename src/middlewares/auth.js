import jwt from 'jsonwebtoken'
import database from '../database/database.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

class Auth {

    constructor() {
        this.sessions = new Array()
        this.createSession = this.createSession.bind(this)
        this.authenticate = this.authenticate.bind(this)
        this.deleteSession = this.deleteSession.bind(this)
    }
    
    authenticate(req, res, next) {
        if (req.session.token) {
            console.log('has session token: ', req.session.token)
            const token = req.session.token
            const result = this.sessions.find((session) => session.token == token)

            if (result) {
                res.locals.auth = true
                res.locals.user_id = result.user_id
            }
            else
                res.locals.auth = false

            next()
            return
        }
        console.log('next')

        res.locals.auth = false

        next()
    }

    async createUser(req, res, next) {
        const {name, n_matricula, password, email} = req.body

        const password_hash = await bcrypt.hash(password, 8)

        await database.models.Users.create({
            name,
            n_matricula,
            password_hash,
            email
        })

        next()
    }

    async createSession(req, res, next) {
        const {email, password} = req.body
        console.log(req.body)

        const result = await database.models.Users.findOne({ where: {
            email: email
        } })

        if (result) {
            const user = {...result.dataValues}

            console.log(user)

            const match = bcrypt.compareSync(password, user.password_hash)

            if (match) {
                const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY)
                req.session.token = token
                console.log(token)
                console.log(this.sessions)
                this.sessions.push({user_id: user.user_id, token: token})
                next()
                return
            } else {
                res.status(200).render('auth/login', { message: "Usuário e/ou senha estão incorretos"})
                return
            }
        }

        res.status(200).render('auth/login', { message: "Usuário e/ou senha estão incorretos"})
        return
    }

    deleteSession(req, res, next) {
        this.sessions = this.sessions.filter(session => session.token !== req.session.token)
        req.session.destroy()
        next()
    }
}

export default new Auth();