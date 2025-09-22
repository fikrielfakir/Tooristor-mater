const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const { createContext } = require('./src/middleware/auth');
const initDatabase = require('./src/database/init');

async function startServer() {
  try {
    // Initialize database first
    await initDatabase();
    console.log('✅ Database initialized successfully');

    const app = express();
    
    // Enable CORS for all origins (adjust in production)
    app.use(cors({
      origin: true,
      credentials: true
    }));
    
    // Handle JSON payloads
    app.use(express.json({ limit: '50mb' }));
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: createContext,
      introspection: true,
      playground: true
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql', cors: false });

    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`📊 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();