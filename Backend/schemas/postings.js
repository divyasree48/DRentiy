import e from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// place, bedrooms, bathrooms, price description, link, required : true
const postingSchema = new Schema({
    place: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    sellerName: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    likes: { type: Array, required: true },
});
export default mongoose.model('Posting', postingSchema);