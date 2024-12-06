import User from "../models/user.model.js";
import Movie from "../models/movie.model.js";


// Add Movie to User's Favorite List
export const addToFavorites = async (req, res) => {
  try {
    const { username, movieId } = req.body;
    console.log("addToFavorites ->  username", username, "movieId", movieId);

    // Validate input
    if (!username || !movieId) {
      return res.status(400).json({ message: "Username and Movie ID are required." });
    }

    // Check if the movie exists in the database
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the movie is already in the user's favorites
    if (user.selectedFilms.includes(movieId)) {
      return res.status(400).json({ message: "Movie is already in the favorite list." });
    }

    // Add the movie to the user's selectedFilms array
    user.selectedFilms.push(movieId);
    await user.save();

    res.status(200).json({
      message: "Movie added to favorites successfully."
    });
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
