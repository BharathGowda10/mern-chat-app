import cloudinary from "../config/cloudinary.js";
import Users from "../model/userModel.js";
import { generateToken } from "../utils/index.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res
        .status(400)
        .json({ message: "Please Fill All the details", success: false });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be 8 digits", success: false });
    }
    const isUserExists = await Users.findOne({ email });
    if (isUserExists) {
      return res
        .status(400)
        .json({ message: "User Already Exists", success: false });
    }
    const user = await Users.create({
      email,
      password,
      fullName,
    });
    await generateToken(user._id, res);
    return res
      .status(201)
      .json({ message: "User Successfully Signed in", success: true });
  } catch (error) {
    console.log("sign up api failed" + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Email Id", success: false });
    }
    const isPswrdCrct = await bcrypt.compare(password, user.password);
    if (!isPswrdCrct) {
      return res
        .status(400)
        .json({ message: "Invalid Password", success: false });
    }
    await generateToken(user._id, res);
    return res
      .status(200)
      .json({ message: "User Logged in Successfully", success: true, user });
  } catch (error) {
    console.log("login up api failed" + error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "User Logged Out Successfully", success: true });
  } catch (error) {
    console.log("logout up api failed" + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is mandotary",
        success: false,
      });
    }
    const updateResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        profilePic: updateResponse.secure_url,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Profile pic uploaded successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log("Update Profile api failed" + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Auth token exists",
      success: true,
      user,
    });
  } catch (error) {
    console.log("check auth api failed" + error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
