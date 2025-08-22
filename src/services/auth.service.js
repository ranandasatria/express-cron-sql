const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [];

const register = async ({ email, password }) => {
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return { success: false, reason: 'EMAIL_EXISTS' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const name = email.split('@')[0];

  const user = {
    id: uuidv4(),
    email,
    password: hashedPassword,
    name,
  };

  users.push(user);
  return { success: true, user: { id: user.id, email: user.email, name: user.name } };
};

const login = async ({ email, password }) => {
  const user = users.find((user) => user.email === email);
  if (!user) {
    return { success: false, reason: 'EMAIL_NOT_FOUND' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, reason: 'INVALID_PASSWORD' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.APP_SECRET,
    { expiresIn: '24h' }
  );

  return { success: true, token };
};

module.exports = {
  register,
  login,
};
