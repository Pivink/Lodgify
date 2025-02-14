const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,  
        max: 5   
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "users",  
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "listing", 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  
    }
});


module.exports = mongoose.model("reviews", reviewSchema);