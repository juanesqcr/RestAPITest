import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  authentification: {
    password: { type: String, require: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});
