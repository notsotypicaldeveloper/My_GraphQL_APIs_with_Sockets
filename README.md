# Purpose
- Create a Authentication and Authorization server using GraphQL, Node.js, Express.
- Add support for real-time communication using WebSockets.
  

# Things we have implemented:
- User can register
- User can login

# Tech stack we are using:
node.js, express.js, graphql-apollo, mongoose, mongodb


# How to run the project
- Create a .env file
- configure following values:

``
PORT=
MONGO_DB_URI=
JWT_SECRET=
``

To run project:
    npm run start

In development mode:
    npm run dev


# Approach we have taken

-> Create a folder with name graphQL and  split the system entities-wise like user.
For each entities like user, we created individual mutations, queries, resolvers and typedefs.

-> Create a service layer for user's database related stuff.

