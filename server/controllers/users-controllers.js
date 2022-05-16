const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'alex',
    email: 'test@test.com',
    password: '1234',
  },
  {
    id: 'u2',
    name: 'john',
    email: 'test1@test.com',
    password: '12345',
  },
  {
    id: 'u3',
    name: 'mark',
    email: 'test2@test.com',
    password: '123456',
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed. Please check your data');
  }

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ user: newUser });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(
    (user) => user.email === email && user.password === password
  );

  if (!identifiedUser) {
    throw new HttpError(
      'Could not identify user. Please enter a valid email',
      401
    );
  }

  res.status(200).json({ message: 'logged in!' });
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid;

  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });

  return res.json({
    user,
  });
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.logIn = logIn;
exports.getUserById = getUserById;
