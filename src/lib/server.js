import { Model, Server } from "miragejs";

let date = new Date();
date.setDate(date.getDate() - 1);
let dateMinusOne = date.toISOString().split("T")[0]

date.setDate(date.getDate() - 3);
let dateMinusThree = date.toISOString().split("T")[0]

let expenses = {
  expenses: [
    {
      dateAdded: dateMinusOne,
      description: "Takeaway pasta for lunch",
      value: 10.85,
      paymentType: "cash",
      additional: ["fast-food"],
    },
    {
      dateAdded: dateMinusThree,
      description: "Few beers with friends",
      value: 17.5,
      paymentType: "card",
      additional: ["alcohol", "regret"],
    },
  ],
};

export function makeServer() {
  let server = new Server({
    models: {
      expense: Model,
    },

    seeds(server) {
      server.db.loadData(expenses);
    },

    routes() {
      this.namespace = "/api";

      this.get("/expenses");
      // this.get('/expenses', ({ db }) => {
      // 	return db.expenses;
      // });

      this.get("/expenses/:id");
      // this.get('/expenses/:id', (schema, request) => {
      // 	let expense = JSON.parse(request.requestBody).data;

      // 	return schema.db.expenses.find(expense.id, expense);
      // });

      this.delete("/expenses/:id");
      // this.delete('/expenses/:id', (schema, request) => {
      // 	let id = request.params.id;

      // 	return schema.db.expenses.find(id).destroy();
      // });

      this.post("/expenses", (schema, request) => {
        let expense = JSON.parse(request.requestBody);    
        
        return schema.db.expenses.insert(expense);
      });
    },
  });

  // window.server = server;

  return server;
}
