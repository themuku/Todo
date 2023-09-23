import jwt from "jsonwebtoken";
import axios from "axios";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Lacks valid authentication credentials" });
    }

    if (!accessToken) await axios.post("http://localhost:3169/auth/refresh");

    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
      if (err) return res.status(403).json({ message: "Forbidden!" });

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default authMiddleware;
