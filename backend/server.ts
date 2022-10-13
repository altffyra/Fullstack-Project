// Importera paket
// Konfigurera servern
import express, { Request, Response } from 'express'
const app = express()
import { Fruit, fakeData } from './fakeDb.js'
const PORT = 1337  // TODO: environment variables istället



// Middleware
app.use( express.json() )



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
app.post('/api/fruits', (req, res) => {
	let newFruit: Fruit = req.body
	// Kontrollera att frukten matchar typen Fruit med hjälp av valideringsfunktion (TypeScript kan inte göra det)
	// Om datan är i ett felaktigt format, skicka statuskod 400: Bad request
	// Om allt gått bra, statuskod 200
	// Observera att man måste köra rätt middleware, för att inkommande data ska läggas i req.body

	console.log('POST incoming fruit: ', newFruit)
	if( !newFruit ) {
		// Svara med statuskod och informativt meddelande
		res.status(400).send('No data')

	} else if( isValidFruit(newFruit) ) {
		// lägg till och skicka tillbaka statuskod 200
		fakeData.fruits.push(newFruit)
		res.sendStatus(200)

	} else {
		res.status(400).send('Bad fruit')
	}
})

function isValidFruit(maybeFruit: Fruit): boolean {
	// En giltig (valid) frukt måste ha egenskaperna name, price och id.
	// Tips: kan göras i en loop
	if (maybeFruit.hasOwnProperty('name')) {
		if ((typeof maybeFruit.name !== 'string') || maybeFruit.name === '') {
			return false
		}
	} else {
		return false
	}

	if (maybeFruit.hasOwnProperty('price')) {
		if ((typeof maybeFruit.price !== 'number') || maybeFruit.price < 0 ) {
			return false
		}
	} else {
		return false
	}

	if (maybeFruit.hasOwnProperty('id')) {
		if ((typeof maybeFruit.id !== 'string') || maybeFruit.id === '') {
			return false
		}
	} else {
		return false
	}

	return true
}




// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
