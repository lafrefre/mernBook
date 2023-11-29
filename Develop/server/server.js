const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const moongoose = require('mongoose');
const {typeDefs, resolvers} = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

moongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const server = new ApolloServer({
  typeDefs,
  resolver,
  context: ({ req }) => req
},
);


server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${3001}`)
);

