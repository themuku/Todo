import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = (username) => {
  const accessToken = jwt.sign({ username }, accessTokenSecret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ username }, refreshTokenSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
