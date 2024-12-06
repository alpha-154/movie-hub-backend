import Movie from "../models/movie.model.js";

export const getMovieById = async (req, res) => {
  try {
    // Destructure the movie ID from the request params
    const { id } = req.params;

    // Validate that the ID is provided
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required." });
    }

    // Find the movie by ID
    const movie = await Movie.findById(id);

    // Check if the movie exists
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    // Return the movie data
    res.status(200).json({ message: "Movie fetched successfully.", movie });
  } catch (error) {
    console.error("Error in getMovieById controller:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid movie ID." });
    }

    // Handle all other errors
    res.status(500).json({ message: "Internal server error." });
  }
};
