import jwt from 'jsonwebtoken'
import database from '../database/database.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

class Auth {

    constructor() {
        this.sessions = []
    }
    
    authenticate(req, res, next) {
        if (req.session.token) {
            const token = req.session.token
            this.sessions.forEach(session => session.token == token ? res.locals.auth = true : res.locals.auth = false)
        }
        console.log('next')
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
        const {username, password} = req.body

        const user = database.models.Users.findAll({ where: {
            name: username
        } })

        bcrypt.compare(password, user.password_hash, (err, success) => {
            
            if (success) {
                const token = jwt.sign({ id: user.user_id }, process.env.SECRET)
                //this.sessions.push(req.session)
                //this.sessions[this.sessions.length - 1].token = token
                req.session.token = token
                this.sessions.push({user_id: user.user_id, token: token})
                next()
            } else {
                res.redirect('/login')
            }
            
        })
    }

    deleteSession(req, res, next) {
        this.sessions = this.sessions.filter(session => session.token !== req.session.token)
        req.session.destroy()
        next()
    }
}

export default new Auth();