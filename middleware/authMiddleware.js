import jwt from "jsonwebtoken";

const accessTokenSecret = process.send.ACCESS_TOKEN_SECRET;

const authMiddleware = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Lacks valid authentication credentials" });
  }

  jwt.verify(accessToken, accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden!" });

    req.user = user;
    next();
  });
};

export default authMiddleware;
