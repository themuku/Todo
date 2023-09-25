import jwt from "jsonwebtoken";
import axios from "axios";
import User from "../models/User.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Lacks valid authentication credentials" });
    }

    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden!" });

      req.body.username = user.username.username;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default authMiddleware;
