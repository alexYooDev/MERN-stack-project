const express = require('express');

const router = express.Router();

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'alex',
    age: '27',
    occupation: 'developer',
  },
];

router.get('/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });

  return res.json({
    user,
  });
});

module.exports = router;
