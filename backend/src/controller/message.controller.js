import cloudinary from "../config/cloudinary.js";
import { getActiveSocketId, io } from "../config/socket.js";
import Message from "../model/messageModel.js";
import Users from "../model/userModel.js";
import mongoose from "mongoose";
import { openai } from "../utils/openAi.js";

export const getAllUsersForChatList = async (req, res) => {
  try {
    const myId = req.user._id;
    const user = await Users.find({ _id: { $ne: myId } }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Empty User List",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User Fetched Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("get user for message api failed" + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: receiverId } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(myId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid senderId or receiverId" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });
    return res.status(200).json({
      message: "All messages are fetched",
      success: true,
      messages,
    });
  } catch (error) {
    console.log("get messages api failed" + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const imageResponse = await cloudinary.uploader.upload(image);
      imageUrl = imageResponse.secure_url;
    }
    const message = new Message({
      receiverId,
      senderId,
      text,
      image: imageUrl,
    });
    await message.save();
    const receiverSocketId = getActiveSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }
    return res.status(201).json({
      message: "Message Sent successfully",
      success: true,
      message,
    });
  } catch (error) {
    console.log("create message api failed" + error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// const upload = multer({ dest: "uploads/" });
// export const transcribeText = [
//   upload.single("audio"),
//   async (req, res) => {
//     try {
//       const audioPath = req.file.path;
//       const text = await transcribeAudio(audioPath);
//       return res.status(200).json({
//         message: "audio transcribed successfully",
//         success: true,
//         text,
//       });
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         return res
//           .status(429)
//           .json({ message: "Too many requests. Please try again later." });
//       }
//       console.log("error fetching whisper api ", error);
//       return res
//         .status(500)
//         .json({ message: "Internal Server Error", success: false });
//     }
//   },
// ];

export const openAiChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiReply = await openai(prompt);
    return res.status(200).json({
      message: "ai message fetched",
      success: true,
      text: aiReply,
    });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }
    console.log("error fetching chat gpt api ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
