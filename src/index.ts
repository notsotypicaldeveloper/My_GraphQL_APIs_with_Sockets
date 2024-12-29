// very first step is to load .env
import 'dotenv/config'
import express from "express";
import cors from 'cors';
import {expressMiddleware} from '@apollo/server/express4';
import connectDB from './db';
import {createApolloGraphQLServer} from "./graphQL/index";
import UserService from './services/user';
import path from 'path';
import http from 'http';
import {Server} from 'socket.io';

async function init() {
    const app = express();
    const server = http.createServer(app);
    
    const PORT = process.env.PORT || 8000;

    const io = new Server(server);

    app.use(express.json());
    app.use(cors());

    // socket in callback parameter signifies client
    io.on("connection", (socket)=> {
        console.log(`user connected with id: ${socket.id}`);

        socket.on("message-to-server", (message)=>{

            io.emit("message-to-users", message);

            // socket.broadcast.emit("message-to-users", message);
        })

        socket.on('disconnect', () => {
            console.log(`user disconnected with id: ${socket.id}`);
        });
    })
  
    app.get('/',(req, res)=> {
        res.json({message: `Server is up and running!`});
    })

    app.use(express.static(path.resolve('./src/client')));
    // connect with database
    await connectDB()
    
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


    
    server.listen(PORT, ()=> {
        console.log(`🚀Server is up and running at port ${PORT}`);
    });
}

init();