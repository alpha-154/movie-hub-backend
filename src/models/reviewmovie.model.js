import mongoose from "mongoose";

const reviewMovieSchema = new mongoose.Schema({
 
  username: {
    type: String,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  movieReview: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const ReviewMovie = mongoose.model("ReviewMovie", reviewMovieSchema);

export default ReviewMovie;