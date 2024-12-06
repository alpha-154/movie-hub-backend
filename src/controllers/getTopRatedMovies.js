import Movie from "../models/movie.model.js";

export const getTopRatedMovies = async (req, res) => {
  try {
    // Fetch the 6 top-rated movies
    const topRatedMovies = await Movie.find()
      .sort({ rating: -1 }) // Sort by rating in descending order
      .limit(6); // Limit to 6 movies

    // Check if any movies were found
    if (topRatedMovies.length === 0) {
      return res.status(404).json({ message: "No movies found." });
    }

    // Return the movies
    res.status(200).json({ 
      message: "Top rated movies fetched successfully.", 
      movies: topRatedMovies 
    });
  } catch (error) {
    console.error("Error in getTopRatedMovies controller:", error);

    // Handle all other errors
    res.status(500).json({ message: "Internal server error." });
  }
};
