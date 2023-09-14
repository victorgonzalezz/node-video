import http from 'node:http'

// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = http.createServer()

// // const database = new DatabaseMemory()
const database = new DatabasePostgres()


server.post('/videos', async (request, respond) => {
    const {title, description, duration} = request.body

    
    await database.create({
        title: title,
        description: description,
        duration: duration,
    })
    

    return  respond.status(201).send()   
    
})

server.get('/videos',  async (request) => {
    const search = request.query.search

    const videos =  await database.list(search)

    return videos
})

server.put('/videos/:id',  async (request, respond) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body
    
    await database.list(videoId, {
        title: title,
        description: description,
        duration: duration
    })

    return respond.status(204).send()
})

server.delete('/videos/:id', async (request, respond) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return respond.status(204).send
})

server.listen({
    host: '0.0.0.0',
    // eslint-disable-next-line no-undef
    port: process.env.PORT ?? 3333,
})
