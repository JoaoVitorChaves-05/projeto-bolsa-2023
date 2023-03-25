import PostModel from '../models/post.model.js'

class HomeController {
    async index(req, res) {
        const data = await PostModel.getPosts()
        console.log(data)
        res.status(200).render('home/index', {data})
    }
}

export default new HomeController()