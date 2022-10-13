// Importera paket
// Konfigurera servern
import express, { Request, Response } from 'express'
const app = express()
import { Fruit, fakeData } from './fakeDb'
const PORT = 1337  // TODO: environment variables istället

// Middleware

// Routes / endpoints
// Exempel: frontend skickar "GET /api/data", backend tar emot och servar ett svar
// HTTP methods: GET, POST, PUT, DELETE -> motsvarar CRUD = Create, Read, Update, Delete
// Dessa fyra används när vi bygger ett RESTful API
// GET    - hämta data
// POST   - lägga till ny data
// PUT    - uppdatera data
// DELETE - ta bort data
app.get('/hello', (req: Request, res: Response) => {
	console.log('GET /hello - request received by server')
	// Vi kan svara med: send, sendFile
	res.send('Hello world!')
})

// Övning: skapa GET och POST-metoder för /api/fruits
// GET  /api/fruits
// GET  /api/fruits/[id]
// POST /api/fruits



// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
