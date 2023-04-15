import PostModel from '../models/post.model.js'

class HomeController {
    async index(req, res) {
        const data = await PostModel.getPosts()
        console.log(data)

        const authStatus = res.locals.auth
        res.status(200).render('home/index', {data: [...data], hasSession: authStatus})
    }
}

export default new HomeController()