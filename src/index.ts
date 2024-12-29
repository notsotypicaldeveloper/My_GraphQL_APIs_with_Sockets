// very first step is to load .env
import 'dotenv/config'
import express from "express";
import cors from 'cors';
import {expressMiddleware} from '@apollo/server/express4';
import connectDB from './db';
import {createApolloGraphQLServer} from "./graphQL/index";
import UserService from './services/user';

async function init() {
    const app = express();
    const PORT = process.env.PORT || 8000;

    app.use(express.json());
    app.use(cors());

    // connect with database
    await connectDB()
  
    app.get('/',(req, res)=> {
        res.json({message: `Server is up and running!`});
    })

    const gqlServer = await createApolloGraphQLServer();

    app.use('/graphql',expressMiddleware(gqlServer, { context: async ({ req }) => {

        // here should be headers
        const token = (req as any).headers['token'];

        try {
            const user = UserService.decodeJWTToken(token);
            return {user};
        }
        // if error, user doesn't exists, so simply return empty
        catch(error) {
            return {};
        }

    }}) as any);


  
    app.listen(PORT, ()=> {
        console.log(`🚀Server is up and running at port ${PORT}`);
    });
}

init();

