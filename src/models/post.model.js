import database from "../database/database.js"

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

        const {Posts, Users} = database.models
        
        Users.hasMany(Posts)
        Posts.belongsTo(Users, { foreignKey: 'user_author_id' })

        const data = await Posts.findOne({
            attributes: ['post_id', 'user_author_id', 'origin', 'destiny', 'departure_time', 'contact', 'car_id', 'createdAt', 'updatedAt'],
            include: {
                model: Users,
                attributes: ['name', 'n_matricula'],
                required: true,
            },
            where: {
                post_id: post_id
            }
        });
        return data
    }

    async addPost(post) {
        await database.models.Posts.create(post)
    }

    async updatePost({user_id, post_id, data}) {
        console.log(user_id, post_id)
        if (typeof user_id == 'number' 
            && typeof post_id == 'number' 
            && data) {
                await database.models.Posts.update({
                    origin: data.origin,
                    destiny: data.destiny,
                    departure_time: data.departure_time,
                    contact: data.contact,
                    car_id: data.car_id
                }, {
                    where: {user_author_id: user_id}
                })

                return {
                    status: true,
                    message: 'Post has been updated with success'
                }
            }
        return {
            status: false,
            message: 'This data is not valid'
        }
    }

    async deletePost({user_id, post_id}) {
        console.log(user_id, post_id)
        if (typeof user_id == 'number' && typeof post_id == 'number') {
            await database.models.Posts.destroy({
                where: { post_id: post_id, user_author_id: user_id }
            })

            return {
                status: true,
                message: 'Post has been deleted with success'
            }
        }

        return {
            status: false,
            message: 'This data is not valid'
        }
    }
}

export default new PostModel()