// Importera paket
// Konfigurera servern
import express, { Request, Response } from 'express'
const app = express()
import { Fruit, fakeData } from './fakeDb.js'
const PORT = 1337  // TODO: environment variables istället
import fruitsRoute from './routes/fruits.js'

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));  // __dirname i äldre versioner av node
const staticPath = join( __dirname, '../../dist' )


// Middleware
app.use( express.json() )  // hanterar JSON i request body

app.use( (req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	next()
} )

// Obs! express.static bör ligga först, när man får många statiska filer
app.use( express.static(staticPath) )


// Routes / endpoints
app.use('/api/fruits', fruitsRoute)


app.get('/hello', (req: Request, res: Response) => {
	console.log('GET /hello - request received by server')
	// Vi kan svara med: send, sendFile
	res.send('Hello world!')
})


// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
