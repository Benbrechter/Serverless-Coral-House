const { ApolloServer } = require('@apollo/server');
const { startServerAndCreateLambdaHandler, handlers } = require('@as-integrations/aws-lambda');
const connectDB = require('./config/connections');

// Import GraphQL schemas and resolvers
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
        console.error('GraphQL Error:', error);
        return error;
    }
});

// Lambda handler
module.exports.graphqlHandler = startServerAndCreateLambdaHandler(
    server,
    handlers.lambda(),
    {
        context: async ({ event, context }) => {
            // Ensure database connection
            await connectDB();

            return {
                event,
                context,
                // Any additional context you need
            };
        }
    }
);