# Purpose
- Create a Authentication and Authorization server using GraphQL, Node.js, Express.
- Add support for real-time communication using WebSockets.
  

# Things we have implemented:
- User can register
- User can login
- User will get authorized
- Real time Chat Application with room functionality

# Tech stack we are using:
node.js, express.js, graphQL, Apollo GraphQL, mongoose, mongodb



# How to run the project
- Create a .env file
- configure following values:

``
PORT=3000
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

-> We use graphQL context 
---------
# Queries we can try on Appolo http://localhost:3000/graphql

#To register a new user:

mutation Mutation($firstName: String!, $lastName: String, $email: String!, $password: String!) {
  createUser(firstName: $firstName, lastName: $lastName,email: $email, password: $password)
}

{  
  "firstName": "jef",
  "lastName": "john",
  "email": "jefjohn@gmail.com",
  "password": "jefjohn"
}

---
#To login a user
query Query($email: String!, $password: String!) {
  getUserToken(email: $email, password: $password)
}

{  
  "email": "jefjohn@gmail.com",
  "password": "jefjohn"
}

In response, we will get jwt token

-----
#Authorizing jwt token 

query GetCurrentLoggedInUser {
  getCurrentLoggedInUser {
    id
    email
  }
}

In header, pass:
token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzE1MjFkM2JhOTg0MWNmNTgxZjMzMyIsImVtYWlsIjoiamVmam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzU0ODE3MjB9.aKl4NNku2l58dPce16IQLlA5_-KJMkD-SXRfR3tjLX4

id and email, we want to fetch, if header 'token' is valid.


# Client side for socket.io
http://localhost:3000/index.html

- Chat room working completely fine
- Currently, set per room will have 3 users.

