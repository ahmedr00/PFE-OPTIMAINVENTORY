import { User } from "../models/user.model.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
export const updateMe = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id; // Assumes your middleware sets req.user

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true },
    ).select("-password");

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Password with Security Check
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    // 1. Verify current password[cite: 8]
    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Mot de passe actuel incorrect" });
    }

    // 2. Hash and save new password[cite: 8]
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Mot de passe mis à jour" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
