// Importera paket
// Konfigurera servern
import express, { Request, Response } from 'express'
const app = express()
import { Fruit, fakeData } from './fakeDb.js'
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
app.get('/api/fruits', (req, res) => {
	res.send(fakeData.fruits)
})

// GET  /api/fruits/[id]
// TypeScript förstår automatiskt URL-parametrar. Följande två rader är om man behöver göra det manuellt.
type IdObject = { id: string };
type IdParam = Request<IdObject>;
app.get('/api/fruits/:id', (req: IdParam, res) => {
	// Ange id antingen med querystring (url?id=123) eller URL-parameter (url/123)
	// :id betyder att vi förväntar oss en URL-parameter med namnet "id"
	let id: string = req.params.id
	let found = fakeData.fruits.find(fruit => fruit.id === id)
	// Array.filter returnerar ALLA element som matchar ett villkor
	// Array.find är smidigare, returnerar FÖRSTA elementet som matchar

	if( found ) {
		res.send(found)  // status 200
	} else {
		res.sendStatus(404)
	}
})

// POST /api/fruits




// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
