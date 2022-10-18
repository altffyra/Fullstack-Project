import { useState } from 'react'
import './App.css'
import { Fruit } from './models/models'

function App() {
	const [maybeFruits, setMaybeFruits] = useState<Fruit[] | null>(null)

	const fetchFruits = async () => {
		const response = await fetch('/api/fruits')
		const data: Fruit[] = await response.json()
		setMaybeFruits(data)
	}

	return (
		<div className="App">
			<h1> The true fullstack experience </h1>
			<button onClick={fetchFruits}> Get fruits </button>
			{maybeFruits ? (
				maybeFruits.map(fruit => (
					<div key={fruit.id}> {fruit.name} costs ${fruit.price}. </div>
				))
				) : 'Har inte hämtat några frukter än'}
		</div>
	)
}

export default App
