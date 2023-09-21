import jwt from "jsonwebtoken";

const accessTokenSecret = process.send.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.send.REFRESH_TOKEN_SECRET;

export default (username) => {
  const accessToken = jwt.sign(
    { username },
    { accessTokenSecret },
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    { refreshTokenSecret },
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
