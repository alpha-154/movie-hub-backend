import express from "express";

import { addMovie } from "../controllers/addMovie.js";
import { deleteMovie } from "../controllers/deleteMovie.js";
import { getAllMovies } from "../controllers/getAllMovies.js";
import { getMovieById } from "../controllers/getMovieById.js";
import { getTopRatedMovies } from "../controllers/getTopRatedMovies.js";
import { updateMovie } from "../controllers/updateMovie.js";
import { fetchMoviesByQuery } from "../controllers/searchMovies.js";
import { addMovieReview } from "../controllers/reviewMovie.js";


const router = express.Router();


router.post("/create-movie", addMovie);
router.delete("/delete-movie", deleteMovie);
router.get("/get-all-movies", getAllMovies);
router.get("/get-movie/:id", getMovieById);
router.get("/top-rated-movies", getTopRatedMovies);
router.post("/update-movie", updateMovie);
router.post("/search-movies", fetchMoviesByQuery);
router.post("/review-movie", addMovieReview);


export default router;