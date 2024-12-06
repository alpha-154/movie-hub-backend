import User from "../models/user.model.js";

export const getFavoriteMovies = async (req, res) => {
  try {
    const { username } = req.params;

    // Validate input
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Find the user by username and populate the selectedFilms array
    const user = await User.findOne({ username }).populate("selectedFilms");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with populated favorite movies
    res.status(200).json({
      message: "User's favorite movies fetched successfully.",
      favoriteMovies: user.selectedFilms, // Populated array of Movie documents
    });
  } catch (error) {
    console.error("Error fetching favorite movies:", error.message);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
