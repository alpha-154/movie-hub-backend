import User from "../models/user.model.js";

export const removeFavoriteMovie = async (req, res) => {
  try {
    const { username, movieId } = req.params;

    // Validate input
    if (!username || !movieId) {
      return res.status(400).json({ message: "Username and movieId are required." });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the movieId exists in the selectedFilms array
    if (!user.selectedFilms.includes(movieId)) {
      return res.status(404).json({ message: "Movie not found in user's favorite list." });
    }

    // Remove the movieId from the selectedFilms array
    user.selectedFilms = user.selectedFilms.filter((id) => id.toString() !== movieId);

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Movie removed from favorites successfully.",
      updatedFavorites: user.selectedFilms, // Optionally return the updated list
    });
  } catch (error) {
    console.error("Error removing favorite movie:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
