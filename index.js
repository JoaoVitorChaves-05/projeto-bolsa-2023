import app from './app.js'
import database from './src/database/database.js'

(async () => await database.createTables())()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`> Listening on ${PORT}`))