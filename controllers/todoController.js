import User from "../models/User.js";

export const getAllTodos = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user) return res.sendStatus(404);

    if (user.todo.length === 0) return res.sendStatus(204);

    const { todo } = user;

    return res.json({ todo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, username } = req.body;

    const user = await User.findOne({ username }).exec();

    if (!user) return res.sendStatus(404);

    const newTodo = [...user.todo, { title, isActive: true }];

    user.todo = newTodo;

    user.save();

    return res
      .status(200)
      .json({ message: `Successfully crated todo ${title}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
