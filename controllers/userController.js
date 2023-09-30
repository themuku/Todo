import User from "../models/User.js";
import bcrypt from "bcrypt";

export const changeUserProfile = async (req, res) => {
  try {
    const { username, newPassword, newImageUrl, newUsername } = req.body;

    if (!username)
      return res.status(401).json({ message: "Username field is required" });

    const user = await User.findOne({ username });

    if (!user) return res.sendStatus(404);

    if (newPassword) {
      const isValidPwd = await bcrypt.compare(newPassword, user.password);

      if (isValidPwd) {
        return res.sendStatus(409);
      }

      if (!isValidPwd) {
        // This means new password is not the same as prev password
        user.password = await bcrypt.hash(newPassword, 10);
      }
    }

    if (newImageUrl) {
      user.imageUrl = newImageUrl;
    }

    const duplicate = await User.findOne({ newUsername }).exec();

    if (duplicate) return res.sendStatus(409);

    user.username = newUsername;

    user.save();

    req.body.username = newUsername;

    return res.json({
      message: `User: ${user.username} successfully changed!`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(401).json({ message: "ID is required" });

    const result = await User.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0)
      return res.status(404).json({ message: `User with id: ${id} not found` });

    return res.json({ message: "User successfully deleted!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
