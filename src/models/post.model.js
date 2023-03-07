import database from "../database/database.js"

class PostModel {
    constructor() {
    }

    async getPosts() {
        const data = await database.models.Posts.findAll()
        return data
    }

    async getPost(post_id) {
        const data = await database.models.Posts.findOne({post_id: post_id})
        return data
    }

    async addPost(post) {
        await database.models.Posts.create(post)
    }
}

export default new PostModel()