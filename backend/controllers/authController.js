import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ================== REGISTER ==================
export const registerUser = async (req, res) => {
  console.log("=== REGISTER REQUEST ===");
  console.log("BODY RECEIVED:", req.body);

  const { name, email, password } = req.body;

  // Validation check
  if (!name || !email || !password) {
    console.log("❌ Validation failed: missing field(s)");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Password hashed for:", email);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log("✅ User created:", email);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      console.log("❌ Failed to create user in DB");
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.error("🔥 Error in registerUser:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================== LOGIN ==================
export const loginUser = async (req, res) => {
  console.log("=== LOGIN REQUEST ===");
  console.log("BODY RECEIVED:", req.body);

  const { email, password } = req.body;

  // Validation check
  if (!email || !password) {
    console.log("❌ Validation failed: missing email or password");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("✅ Login successful for:", email);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      console.log("❌ Invalid credentials for:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("🔥 Error in loginUser:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};
