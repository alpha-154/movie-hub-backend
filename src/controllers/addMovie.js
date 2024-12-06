import Movie from "../models/movie.model.js";

export const addMovie = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      uploadedBy,
      title,
      posterImg,
      genre,
      duration,
      releaseYear,
      rating,
      description,
    } = req.body;
    // console.log(
    //   "addMovie -> req.body",
    //   uploadedBy,
    //   title,
    //   posterImg,
    //   genre,
    //   duration,
    //   releaseYear,
    //   rating,
    //   description
    // );

    // Validate required fields
    if (
      !title ||
      !posterImg ||
      !genre ||
      !duration ||
      !releaseYear ||
      !rating ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate data types and constraints
    if (!Array.isArray(genre) || genre.length === 0) {
      return res
        .status(400)
        .json({ message: "Genre must be a non-empty array of strings." });
    }

    if (typeof rating !== "number" || rating < 0 || rating > 10) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 0 and 10." });
    }

    // Create a new movie in the database
    const newMovie = await Movie.create({
      uploadedBy,
      title,
      posterImg,
      genre,
      duration,
      releaseYear,
      rating,
      description,
    });

    // Respond with the created movie details
    res.status(201).json({
      message: "Movie added successfully.",
      movie: newMovie,
    });
  } catch (error) {
    console.error("Error in addMovie controller:", error);

    // Handle specific error types
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid data provided.", details: error.message });
    }

    // Handle all other errors
    res.status(500).json({ message: "Internal server error." });
  }
};
