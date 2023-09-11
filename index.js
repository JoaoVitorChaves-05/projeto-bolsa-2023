import app from './app.js'
import database from './src/database/database.js'

(async () => {
    try {
        await database.createTables()
    } catch (err) {
        console.log(err)
    }
})()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`> Listening on ${PORT}`))