import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
    getUserToken: async(_:any, payload: {email: string, password: string})=> {
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        }) 
        return token;
    },

    getCurrentLoggedInUser: async(_: any, parameters: any, context: any)=> {
        console.log("context = ", context);
        if(context && context.user) {
            // return context.user;
            const id = context.user.id;
            const user = await UserService.getUserById(id);
            return user;
        }
        else {
            throw new Error('Unknown user or Invalid token');
        }
    }
};
const mutations = {
    createUser: async(_:any, payload: CreateUserPayload)=> {
        const res = await UserService.createUser(payload);
        console.log(`res = :::`, res);
        return res._id;
    }
};

export const resolvers = {queries, mutations};
