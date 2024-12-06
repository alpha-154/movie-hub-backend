import express from "express";
import { registerUser } from "../controllers/registerUser.js";
import { registerUserWithGoogle } from "../controllers/registerUserWithGoogle.js";
import { addToFavorites } from "../controllers/addToFavorite.js";
import { getFavoriteMovies } from "../controllers/getAllFavoritesMovies.js";
import {  removeFavoriteMovie } from "../controllers/removeMovieFromFavorite.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/register-with-google", registerUserWithGoogle);
router.post("/add-to-favorite", addToFavorites);
router.get("/get-favorites-movies/:username", getFavoriteMovies);
router.delete("/remove-from-favorites/:username/:movieId", removeFavoriteMovie);

export default router;