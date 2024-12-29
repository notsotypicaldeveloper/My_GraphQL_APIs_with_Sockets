import { ApolloServer } from '@apollo/server';
import { User } from './user';

export async function createApolloGraphQLServer() {

     // Create GraphQL Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
        `, 
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations 
            },
        }
        
    });

    // Start the gql server 
    await gqlServer.start();

    return gqlServer;

}

