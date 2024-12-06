import User from "../models/user.model.js";

export const registerUserWithGoogle = async (req, res) => {
  try {
    const { firebaseUid, name, email, profileImage } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ firebaseUid });

    if (existingUser) {
      // User already exists, return 200 status
      return res.status(200).json({ message: "User already exists." });
    }

    // Create a new user in the database
    const newUser = new User({
      firebaseUid,
      username: name,
      email,
      profileImage,
      selectedFilms: [], // Initialize favorite movies list as empty
    });

    await newUser.save();

    // Return 201 status for a successfully created user
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    // Handle potential errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
