// very first step is to load .env
import 'dotenv/config'
import express from "express";
import cors from 'cors';
import {expressMiddleware} from '@apollo/server/express4';
import connectDB from './db';
import {createApolloGraphQLServer} from "./graphQL/index";

async function init() {
    const app = express();
    const PORT = process.env.PORT || 8000;

    app.use(express.json());
    await connectDB()
  
    app.get('/',(req, res)=> {
        res.json({message: `Server is up and running!`});
    })

    const gqlServer = await createApolloGraphQLServer();
    app.use('/graphql',expressMiddleware(gqlServer, {}) as any);


  
    app.listen(PORT, ()=> {
        console.log(`🚀Server is up and running at port ${PORT}`);
    });
}

init();

