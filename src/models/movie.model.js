import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    uploadedBy: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true,
    },
    posterImg: {
        type: String,
        required: true,
    },
    genre: [
        {
            type: String,
            required: true
        }
    ],
    duration: {
        type: String,
        required: true
    },
    releaseYear: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
   
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
