import database from '../src/database/database.js'
import app from '../app.js'

(async () => {
    try {
        await database.createTables()
    } catch (err) {
        console.log(err)
    }
})()

export default app