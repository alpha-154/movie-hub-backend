import Movie from "../models/movie.model.js";

// Controller to fetch movies based on a query string
export const fetchMoviesByQuery = async (req, res) => {
  try {
    const { query } = req.body; // Extract the query from the request body

    // Validate that a query is provided
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required." });
    }

    // Search for movies where the title contains the query string (case-insensitive)
    const movies = await Movie.find({
      title: { $regex: query, $options: "i" }, // "i" for case-insensitive
    });

    // Check if any movies were found
    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movies found matching the query." });
    }

    // Respond with the list of movies
    res.status(200).json( { searchedMovies: movies } );
  } catch (error) {
    console.error("Error fetching movies by query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
