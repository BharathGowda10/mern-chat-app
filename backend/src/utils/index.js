import jwt from "jsonwebtoken";

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
   return res.cookie("token", token, {
    withCredentials: true,
    httpOnly: true,
    maxAge: 600000,
  });
};
