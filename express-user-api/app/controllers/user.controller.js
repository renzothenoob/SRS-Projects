const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const HASH_SALT = process.env.HASH_SALT || 5;

const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.send({ users });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.send({ user });
};

const adduser = async (req, res) => {
  const { username, password } = req.body;

  await bcrypt.hash(password, HASH_SALT, function (err, hash) {
    const user = User.create({ username: username, password: hash });
    res.send({ user });
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, HASH_SALT);

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { username: username, password: hashed }
  );

  res.send({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete({ _id: id });
  res.send({ user });
};

module.exports = {
  getAllUser,
  getUser,
  adduser,
  updateUser,
  deleteUser,
};

const hashPass = async (password) => {};