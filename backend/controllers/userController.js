import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

  try {
    const userExists = await User.findOne({ email });

    if(userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    if(password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be atleast of 8 characters." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });

  } catch (error) {
    console.error("Register Error: ", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(500).json({ success: false, message: "Invalid Credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(500).json({ success: false, message: "Invalid Credentials." });
        }

        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        res.json(user);
    } catch (error) {
        console.error("GetUserProfile: ", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};