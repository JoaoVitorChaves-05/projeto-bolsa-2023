import PostModel from "../models/post.model.js";
import Auth from '../middlewares/auth.js'
class PostController {
    index(req, res) {
        if (res.locals.auth)
            res.status(200).render('post/index', {hasSession: true})
        else
            res.redirect('/login')
    }

    async addPost(req, res) {
        const {origin, destiny, hours, minutes, contact, car_id} = req.body

        const token = req.session.token
        const sessions = Auth.sessions

        const currentSession = sessions.find(session => session.token == token)

        const departure_time = hours + 'h' + minutes

        await PostModel.addPost({
            user_author_id: currentSession.user_id,
            origin,
            destiny,
            departure_time,
            contact,
            car_id
        })

        res.redirect('/')
    }
}

export default new PostController()