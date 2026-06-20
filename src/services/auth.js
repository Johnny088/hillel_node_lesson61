import { TWENTY_MINUTES, TWO_DAYS } from '../constants.js';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';
import { randomBytes } from 'node:crypto';

export const findUserByEmail = email => User.findOne({ email });

export const createUser = () => User.create(userData);

export const createSession = userId => {
  const session = {
    userId,
    accessToken: randomBytes(30).toString('base64'),
    accessTokenExpiration: Date.now() + TWENTY_MINUTES,
    refreshToken: randomBytes(30).toString('base64'),
    refreshTokenExpiration: Date.now() + TWO_DAYS,
  };
  return Session.create(session);
};
