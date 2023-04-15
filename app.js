import express from 'express'
import session from 'express-session'
import methodOverride from 'method-override'
import dotenv from 'dotenv'
dotenv.config()

import home from './src/routes/home.routes.js'
import auth from './src/routes/auth.routes.js'
import post from './src/routes/post.routes.js'
import about from './src/routes/about.routes.js'

class App { 
    constructor() {
        this.app = express()
        this.middleware()
        this.routes()
        this.app.use(express.static('./src/public'))
        this.app.set('view engine', 'ejs')
        this.app.set('views', './src/views')
    }

    middleware() {
        this.app.use(session({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: true,
            cookie: {secure: false}
        }))
        //this.app.use(flash())
        //this.app.use(cookieParser())
        this.app.use(express.urlencoded({ extended: false}))
        this.app.use(express.json())
        this.app.use(methodOverride('_method'))
    }

    routes() {
        this.app.use('/', home) // /
        this.app.use('/', post) // /post/
        this.app.use('/', auth) // /auth
        //this.app.use('/', auth)
        this.app.use('/', about) // /about/
    }
}

export default new App().app