import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/generateTokens.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required!" });

    const user = await User.findOne({ username }).exec();

    const isValidPwd = await bcrypt.compare(password, user.password);

    if (!isValidPwd)
      return res.status(401).json({
        message: "Invalid username or password :(",
      });

    return res.status(200).json({ success: "Logged in successfuly :)" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, imgUrl } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required!" });

    const duplicate = await User.findOne({ username }).exec();

    if (duplicate) return res.sendStatus(409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      username,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens(username);

    req.cookies("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    req.cookies("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ success: `New User ${username} created!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const refresh = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden!" });

    const { accessToken } = generateTokens(user);

    res.cookies("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ accessToken });
  });
};
