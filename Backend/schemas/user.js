import mongoose from "mongoose";
const Schema = mongoose.Schema;
// firstname, lastname, email, password, phonenumber, postings: array, required : true
const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    usertype: { type: String, required: true },
});
export default mongoose.model('User', UserSchema);