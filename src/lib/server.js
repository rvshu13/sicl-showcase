import { Server } from 'miragejs';

let expenses = [
	{
		id: 1,
		dateAdded: '2022-07-01',
		description: 'Takeaway pasta for lunch',
		value: 10.85,
		paymentType: 'cash',
		additionalInfo: ['fast-food']
	},
	{
		id: 2,
		dateAdded: '2020-07-04',
		description: 'Drunk again',
		value: 17.5,
		paymentType: 'card',
		additionalInfo: ['alcohol', 'regret']
	}
];

export function makeServer() {
	let server = new Server({
		seeds(server) {
			server.db.loadData(expenses);
		},
		routes() {
			this.namespace = '/api';

			this.get('/expenses', ({ db }) => {
				return db.expenses;
			});

			this.get('/expenses/:id', (schema, request) => {
				let expense = JSON.parse(request.requestBody).data;

				return schema.db.expenses.find(expense.id, expense);
			});

			this.delete('/expenses/:id', (schema, request, response) => {
				return schema.db.expenses.remove(request.params.id);
			});
		}
	});

	window.server = server;

	return server;
}
