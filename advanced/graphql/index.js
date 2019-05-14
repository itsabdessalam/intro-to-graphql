const { ApolloServer } = require("apollo-server-express"),
  resolvers = require("./resolvers"),
  typeDefs = require("./schema"),
  server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
