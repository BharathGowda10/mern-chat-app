import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token available", success: false });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ message: "Uauthorized - invalid Token", success: false });
    }

    const user = await Users.findById(decode.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("routes authentication failed" + error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
