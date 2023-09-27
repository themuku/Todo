import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (user) => {
  const accessToken = jwt.sign({ user }, accessTokenSecret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ user }, refreshTokenSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
