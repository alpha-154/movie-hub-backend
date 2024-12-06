import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  //console.log("registerUser function called");
  try {
    // Destructure required fields from the request body
    const { firebaseUid, name, email, profileImage } = req.body;
    //console.log( "registerUser -> req.body", firebaseUid, name, email, profileImage);

    // Validate the request body
    if (!firebaseUid || !name || !email || !profileImage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if a user with the same Firebase UID or email already exists
    const existingUser = await User.findOne({
      $or: [{ firebaseUid }, { email }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this UID or email already exists." });
    }

    // Create a new user in the database
    const newUser = await User.create({
      firebaseUid,
      username: name,
      email,
      profileImage,
    });

    // Return a success response
    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.name,
        email: newUser.email,
        profileImage: newUser.profileImage,
        selectedFilms: [],
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);

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

