import ReviewMovie from "../models/reviewmovie.model.js";

// Controller to add a movie review
export const addMovieReview = async (req, res) => {
    console.log("addMovieReview");
  try {
    // Destructure fields from the request body
    const { username, movieName, movieReview, rating } = req.body;

    // Validate required fields
    if (!username || !movieName || !movieReview || rating === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure rating is within the valid range (e.g., 1-5)
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    // Create a new review document
    const newReview = new ReviewMovie({
      username,
      movieName,
      movieReview,
      rating,
    });

    // Save the review to the database
    await newReview.save();

    // Send a success response
    return res.status(201).json({
      message: "Movie reviewed successfully!",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding movie review:", error);
    return res.status(500).json({
      message: "Failed to add movie review. Please try again later.",
    });
  }
};
