import { ApolloServer } from '@apollo/server';
import { User } from './user';

export async function createApolloGraphQLServer() {

     // Create GraphQL Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
                getContext: String
            }
            type Mutation {
                ${User.mutations}
            }
        `, 
        resolvers: {
            Query: {
                ...User.resolvers.queries,
               
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

