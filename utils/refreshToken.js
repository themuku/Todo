import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshToken = async (req, res, username) => {
  try {
    if (!req.cookie.refreshToken) res.status(401);

    const accessToken = jwt.sign({ username }, accessTokenSecret, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    return res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default refreshToken;
