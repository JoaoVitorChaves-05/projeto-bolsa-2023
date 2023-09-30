import app from './app.js'
import database from './src/database/database.js'
import events from 'events'

(async () => {
    try {
        await database.createTables()
        eventEmitter.emit('connection')
    } catch (err) {
        console.log(err)
    }
})()

const PORT = process.env.PORT || 3000

const eventEmitter = new events.EventEmitter()

eventEmitter.on('connection', () => app.listen(PORT, () => console.log(`> Listening on ${PORT}`)))