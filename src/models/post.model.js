import database from "../database/database.js"
import { Sequelize } from "sequelize"

class PostModel {
    constructor() {
    }

    async getPosts() {
        const {Posts, Users} = database.models
        
        Users.hasMany(Posts)
        Posts.belongsTo(Users, { foreignKey: 'user_author_id' })

        const data = await Posts.findAll({
            attributes: ['post_id', 'user_author_id', 'origin', 'destiny', 'departure_time', 'contact', 'car_id', 'createdAt', 'updatedAt'],
            include: {
                model: Users,
                attributes: ['name', 'n_matricula'],
                required: true,
            },
        });
       
        return data
    }

    async getPost(post_id) {
        const {Posts} = database.models

        const data = await Posts.findOne({post_id: post_id})
        return data
    }

    async addPost(post) {
        await database.models.Posts.create(post)
    }
}

export default new PostModel()