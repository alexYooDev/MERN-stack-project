const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const usersController = require('../controllers/users-controllers');

router.get('/', usersController.getAllUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  usersController.signUp
);

router.post('/login', usersController.logIn);

router.get('/:uid', usersController.getUserById);

module.exports = router;
