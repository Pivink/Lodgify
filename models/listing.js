const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: { type: String },
        url: { 
            type: String, 
            default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
    }
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;