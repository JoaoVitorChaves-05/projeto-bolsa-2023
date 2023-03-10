import { Sequelize, DataTypes } from "sequelize"

class Database {
    constructor() {
        this.connection = new Sequelize('mysql://root:root@localhost:3306/service_car')
        this.models = {}
        this.createTables()
    }

    async authentication() {
        try {
            await this.connection.authenticate()
            console.log('Connection has been established successfully.')
        } catch (err) {
            console.error('Unable to connect to the database: ', err)
        }
    }

    async createTables() {
        this.models.Users = this.connection.define('Users', {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            n_matricula: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userType: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        this.models.Posts = this.connection.define('Posts', {
            post_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_author_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            origin: {
                type: DataTypes.STRING,
                allowNull: false
            },
            destiny: {
                type: DataTypes.STRING,
                allowNull: false
            },
            departure_time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contact: {
                type: DataTypes.STRING,
                allowNull: false
            },
            car_id: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        await this.connection.sync()
    }
}

const database = new Database()

export default database