import { Sequelize } from 'sequelize/lib/index';
import pg from 'pg';


class Database {
    constructor() {
        //this.connection = new Sequelize('mysql://root:root@localhost:3306/service_car')
        /*this.connection = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
            dialectModule: pg,
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE
        })*/
        this.connection = new Sequelize(process.env.POSTGRES_URL + '?sslmode=require', {
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
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            n_matricula: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })

        await this.models.Users.sync()

        this.models.Posts = this.connection.define('Posts', {
            post_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_author_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: this.models.Users,
                    key: 'user_id'
                }
            },
            origin: {
                type: Sequelize.STRING,
                allowNull: false
            },
            destiny: {
                type: Sequelize.STRING,
                allowNull: false
            },
            contact: {
                type: Sequelize.STRING,
                allowNull: false
            },
            car_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            marker_origin_lat: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            marker_origin_lng: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            marker_destiny_lat: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            marker_destiny_lng: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
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