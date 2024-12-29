// Import necessary modules
import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for User document
export interface IUser extends Document {
    firstName: String;
    lastName ?: String;
    email: String;
    password: String;
    refreshToken ?: String;
    createdAt: Date;
    updatedAt: Date;
    salt: String;
  }
  
  // Create a schema for the User model
  const userSchema: Schema<IUser> = new Schema(
    {
      firstName: {type: String, required: true, trim: true},
      lastName: {type: String, required: false, trim: true},
      email: { type: String, required: true, unique: true,  lowercase: true, trim: true, index: true },
      password: { type: String, required: true},  
      refreshToken: { type: String },
      salt: {type: String}
    },
    { timestamps: true }
  );


export const user = mongoose.model<IUser>("user", userSchema);

