
export type Fruit = {
	name: string;
	price: number;
	id: string;
}
export type Schema = {
	fruits: Fruit[];
}

const fakeData: Schema = {
	fruits: [
		{ name: 'baNaNa', price: 200, id: '1' },
		{ name: 'apple', price: 5, id: 'p' },
		{ name: 'lime', price: 25, id: '12' }
	]
}

export { fakeData }
