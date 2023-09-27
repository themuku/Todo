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

export const updateTodo = async (req, res) => {
  try {
    const { username, title, isActive } = req.body;
    const id = req.params.id;

    if (!id)
      return res.status(400).json({ message: "Id parameter is missing!" });

    const user = await User.findOne({ username }).exec();

    if (!user) return res.status(404).json({ message: "User not Found!" });

    const todo = user.todo.find((t) => t._id.toString() === id);

    if (title) todo.title = title;
    if (isActive) todo.isActive = isActive;

    user.save();

    return res.json({ message: `Successfully changed todo with id: ${id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      return res.status(400).json({ message: "Id parameter is missing!" });

    const result = await User.deleteOne({ _id: id });

    return res.json({
      message: `User with id: ${id} was deleted`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
