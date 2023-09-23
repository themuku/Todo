import Todo from "../models/Todo.js";
import User from "../models/User.js";
import refreshToken from "../utils/refreshToken.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos) return res.status(404);
    if (todos.length === 0) return res.status(204);

    return res.json({ todos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title)
      return res.status(400).json({ message: "Todo title is required!" });

    if (!req.cookies.accessToken) {
      if (!req.cookies.refreshToken) return res.status(401);
      else res.redirect("/auth/refresh");
    }

    const accessToken = req.cookies.accessToken;

    const username = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64").toString(),
    ).username;

    const user = await User.findOne({ username }).exec();

    if (user) return res.json({ message: "New todo is added!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
