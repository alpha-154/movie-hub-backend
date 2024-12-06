import Movie from "../models/movie.model.js";

export const updateMovie = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { title, posterImg, genre, duration, releaseYear, rating, description } = req.body;

    // Validate required fields
    if (!title || !posterImg || !genre || !duration || !releaseYear || !rating || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate that `genre` is an array
    if (!Array.isArray(genre)) {
      return res.status(400).json({ message: "Genre must be an array of strings." });
    }

    // Find the movie by ID and uploadedBy field
    const movie = await Movie.findOne({ title });

    if (!movie) {
      return res
        .status(404)
        .json({ message: "Movie not found or you do not have permission to update it." });
    }

    // Update the movie's fields
    movie.title = title;
    movie.posterImg = posterImg;
    movie.genre = genre;
    movie.duration = duration;
    movie.releaseYear = releaseYear;
    movie.rating = rating;
    movie.description = description;

    // Save the updated movie
    const updatedMovie = await movie.save();

    // Respond with the updated movie
    res.status(201).json({
      message: "Movie updated successfully.",
      movie: updatedMovie,
    });
  } catch (error) {
    console.error("Error in updateMovie controller:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid movie ID." });
    }

    // Handle all other errors
    res.status(500).json({ message: "Internal server error." });
  }
};
