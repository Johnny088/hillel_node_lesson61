import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../services/auth.js';
import { setCookies } from '../utils/index.js';

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  const user = findUserByEmail(email);

  if (!user) {
    throw createHttpError(409, 'User with such email already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    userName,
    email,
    password: hashedPassword,
  });

  const session = await createSession(newUser._id);

  await setCookies(session, res);

  res.status(201).json({ userName: newUser.userName, email: newUser.email });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user) {
    throw (401, 'invalid credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw (401, 'invalid credentials');
  }
};
