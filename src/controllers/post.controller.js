import PostModel from "../models/post.model.js";
import Auth from '../middlewares/auth.js'
class PostController {
    index(req, res) {
        if (res.locals.auth)
            res.status(200).render('post/index', {hasSession: true})
        else
            res.redirect('/login')
    }

    async getPost(req, res) {
        const { post_id } = req.query

        const result = await PostModel.getPost(post_id)

        console.log(result)

        res.status(200).json(result)
    }

    async addPost(req, res) {
        const {origin, destiny, description, contact, car_id, marker_origin_lat, marker_origin_lng, marker_destiny_lat, marker_destiny_lng} = req.body

        console.log(req.body)

        const user_id = res.locals.user_id

        //const departure_time = hours + 'h' + minutes

        //let days = []

        /*
        for (let i = 1; i <= 7; i++) {
            if (req.body[i])
                days.push(true)
            else
                days.push(false)
        }
        */

        //console.log(days)

        await PostModel.addPost({
            user_author_id: user_id,
            origin,
            destiny,
            contact,
            car_id,
            description,
            marker_origin_lat,
            marker_origin_lng,
            marker_destiny_lat,
            marker_destiny_lng
        })

        res.redirect('/')
    }

    async updatePost(req, res) {
        const { origin, destiny, contact, car_id, post_id, description } = req.body
        const { user_id } = res.locals

        const result = await PostModel.updatePost({
            user_id: user_id, 
            post_id: Number(post_id),
            data: {
                origin,
                destiny,
                contact,
                car_id,
                description
            }
        })

        console.log(result)

        res.redirect('/profile')
    }

    async deletePost(req, res) {
        const { post_id } = req.body
        const { user_id } = res.locals

        const result = await PostModel.deletePost({post_id: Number(post_id), user_id})

        console.log(result)

        res.redirect('/profile')
    }
}

export default new PostController()