import express, { Request, Response } from 'express'
const router = express.Router()
import { Fruit, fakeData } from '../fakeDb.js'
import { isValidFruit } from '../validation.js'
// Exempel: frontend skickar "GET /api/data", backend tar emot och servar ett svar
// HTTP methods: GET, POST, PUT, DELETE -> motsvarar CRUD = Create, Read, Update, Delete
// Dessa fyra används när vi bygger ett RESTful API
// GET    - hämta data
// POST   - lägga till ny data
// PUT    - uppdatera data
// DELETE - ta bort data


// Övning: skapa GET och POST-metoder för /api/fruits
// GET  /api/fruits
router.get('/', (req, res) => {
	res.send(fakeData.fruits)
})

// GET  /api/fruits/[id]
// TypeScript förstår automatiskt URL-parametrar. Följande två rader är om man behöver göra det manuellt.
type IdObject = { id: string };
type IdParam = Request<IdObject>;
router.get('/:id', (req: IdParam, res) => {
	// Ange id antingen med querystring (url?id=123) eller URL-parameter (url/123)
	// :id betyder att vi förväntar oss en URL-parameter med namnet "id"
	let id: string = req.params.id
	let found = fakeData.fruits.find(fruit => fruit.id === id)
	// Array.filter returnerar ALLA element som matchar ett villkor
	// Array.find är smidigare, returnerar FÖRSTA elementet som matchar

	if (found) {
		res.send(found)  // status 200
	} else {
		res.sendStatus(404)
	}
})

// POST /api/fruits
router.post('/', (req, res) => {
	let newFruit: Fruit = req.body
	// Kontrollera att frukten matchar typen Fruit med hjälp av valideringsfunktion (TypeScript kan inte göra det)
	// Om datan är i ett felaktigt format, skicka statuskod 400: Bad request
	// Om allt gått bra, statuskod 200
	// Observera att man måste köra rätt middleware, för att inkommande data ska läggas i req.body

	console.log('POST incoming fruit: ', newFruit)
	if (!newFruit) {
		// Svara med statuskod och informativt meddelande
		res.status(400).send('No data')

	} else if (isValidFruit(newFruit)) {
		// lägg till och skicka tillbaka statuskod 200
		fakeData.fruits.push(newFruit)
		res.sendStatus(200)

	} else {
		res.status(400).send('Bad fruit')
	}
})




export default router
