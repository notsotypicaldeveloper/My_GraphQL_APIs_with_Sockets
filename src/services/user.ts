import {createHmac, randomBytes} from "node:crypto";
import { user } from "../models/user.model";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

class UserService {

    private static generateHash(salt: string, password: string) {

        const hashedPassword = createHmac('sha256',salt).update(password).digest("hex");
        console.log("hashedPassword === :::", hashedPassword);
        return hashedPassword;


    }
    public static createUser(payload: CreateUserPayload) {
        const {firstName, lastName, email, password} = payload;
        
        // Add email, password, validations here


        // it is important to pass hex in toString() method, else we will have some non-readable character in database
        const salt = randomBytes(32).toString('hex');
        console.log("salt === :::", salt);
        const hashedPassword = UserService.generateHash(password, salt);


        // Create a new blog post object
        const newUser = new user({
           firstName,
           lastName,
           email,
           salt,
           password: hashedPassword
        });
        // Insert the article in our MongoDB database
        return newUser.save();
    }

    private static getUserByEmail(email: string) {
        return user.findOne({ email: email });;
    }
    public static async getUserToken(payload: GetUserTokenPayload) {
        const {email, password} = payload;
        // donot forget, we have to make it await too.
        const user = await UserService.getUserByEmail(email);
        
        if(!user) { throw new Error(`user not found`);}

        const userSalt:string = (user.salt as any);
        const usersHashedPassword = UserService.generateHash(userSalt, password);

        if(usersHashedPassword == user.password) {
            // We are not throwing just incorrect password, as we want to confuse a bit to unauthorized person
            throw new Error(`Incorrect Password or email!`);
        }

        // Generate the token
        const token = JWT.sign({id: user.id, email: user.email}, process.env.JWT_SECRET || "");
        return token;
    }
}

export default UserService;
