import Movie from "../models/movie.model.js";

export const getAllMovies = async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find();

    // Check if movies exist
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }

    // Respond with the movies
    res.status(200).json({
      message: "Movies fetched successfully.",
      movies,
    });
  } catch (error) {
    console.error("Error in getAllMovies controller:", error);

    // Handle any unexpected errors
    res.status(500).json({ message: "Internal server error." });
  }
};
