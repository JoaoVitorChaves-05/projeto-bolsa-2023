import { Sequelize, DataTypes } from '../../node_modules/sequelize/lib/index.mjs';
import pg from 'pg';


class Database {
    constructor() {
        //this.connection = new Sequelize('mysql://root:root@localhost:3306/service_car')
        this.connection = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
            dialectModule: pg
        })
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
            }
        })

        await this.models.Users.sync()

        this.models.Posts = this.connection.define('Posts', {
            post_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_author_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: this.models.Users,
                    key: 'user_id'
                }
            },
            origin: {
                type: DataTypes.STRING,
                allowNull: false
            },
            destiny: {
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
            },
            marker_origin_lat: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            marker_origin_lng: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            marker_destiny_lat: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            marker_destiny_lng: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        await this.models.Posts.sync()
        /*
        this.models.Posts = this.connection.define('Posts', {
            post_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_author_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: this.models.Users,
                    key: 'user_id'
                }
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
            },
            marker_origin_lat: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            marker_origin_lng: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            marker_destiny_lat: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            marker_destiny_lng: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        })
          
        await this.models.Posts.sync()

        this.models.Days = this.connection.define('Days', {
            day_id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            day_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        })

        await this.models.Days.sync()

        this.models.Posts_Days = this.connection.define('Posts_Days', {
            post_days_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            day_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: this.models.Days,
                    key: 'day_id'
                }
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: this.models.Posts,
                    key: 'post_id'
                }
            }
        })

        this.models.Posts_Days.sync()
        */
    }
}

const database = new Database()

export default database