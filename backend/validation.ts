import { Fruit } from './models.js'

export function isValidFruit(maybeFruit: Fruit): boolean {
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
		if ((typeof maybeFruit.price !== 'number') || maybeFruit.price < 0) {
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