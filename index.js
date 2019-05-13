const { buildSchema } = require("graphql");
const express = require("express");
const graphqlHTTP = require("express-graphql");

// utils
const utils = {
  parseDate: strDate =>
    new Date(
      strDate
        .split("/")
        .reverse()
        .join("/")
    )
};

// Todo class
class Todo {
  constructor(id, dueDate, content) {
    this.id = id;
    this.dueDate = utils.parseDate(dueDate);
    this.content = content;
  }

  expiresIn() {
    let interval = Math.floor((this.dueDate - new Date()) / 86400000);
    return `${interval} ${interval > 1 ? "days" : "day"}`;
  }

  excerpt() {
    return this.content.length > 10
      ? `${this.content.substring(0, 10)}...`
      : this.content;
  }
}

// data
let todos = [
  new Todo(1, "15/05/2019", "Do something 1"),
  new Todo(2, "20/05/2019", "Do something 2"),
  new Todo(3, "25/05/2019", "Do something 3")
];

// schema
const schema = buildSchema(`
    scalar Date

    type Todo  {
        id: ID!
        dueDate: Date!
        content: String!
        expiresIn: String!
        excerpt: String!
    }

    type Query {
        getTodos: [Todo]!
        getTodo(id: ID!) : Todo!
    }

    type Mutation  {
        addTodo(dueDate: Date!, content: String!): Todo!
        deleteTodo(id: ID!): Todo!
        updateTodo(id: ID, dueDate: Date, content: String): Todo!
    }
`);

const root = {
  getTodos: () => {
    return todos;
  },

  getTodo: ({ id }) => {
    return todos.filter(todo => todo.id === parseInt(id))[0];
  },

  addTodo: args => {
    const { dueDate, content } = args;
    const todo = new Todo(todos.length + 1, dueDate, content);
    todos.push(todo);
    return todo;
  },

  deleteTodo: ({ id }) => {
    for (let index = 0; index < todos.length; index++) {
      const todo = todos[index];
      if (todo.id === parseInt(id)) {
        todos.splice(index, 1);
        return todo;
      }
    }
    return null;
  },

  updateTodo: ({ id, dueDate, content }) => {
    for (let index = 0; index < todos.length; index++) {
      const todo = todos[index];
      if (todo.id === parseInt(id)) {
        todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
        todo.content = content !== undefined ? content : todo.content;
        return todo;
      }
    }
    return null;
  }
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen("1337", () =>
  console.log(`🚀 Server ready at http://localhost:1337`)
);
