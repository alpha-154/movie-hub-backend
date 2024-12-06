import Movie from "../models/movie.model.js";


export const deleteMovie = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const { userName, id } = req.body;

    // Validate required fields
    if (!userName || !id) {
      return res.status(400).json({ message: "userName and id are required." });
    }

    // Find the movie by ID and uploadedBy field
    const movie = await Movie.findOne({ _id: id, uploadedBy: userName });

    if (!movie) {
      return res
        .status(404)
        .json({ message: "Only the user who uploaded the movie can delete it." });
    }

    // Delete the movie
    await Movie.deleteOne({ _id: id });

    // Respond with success message
    res.status(200).json({ message: "Movie deleted successfully." });
  } catch (error) {
    console.error("Error in deleteMovie controller:", error);

    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid movie ID." });
    }

    // Handle all other errors
    res.status(500).json({ message: "Internal server error." });
  }
};
