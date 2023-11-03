const router = require('express').Router();
const {
   getUser,
   getUsers,
   createUser,
   updateUser,
   deleteUser,
   addFriend,
   removeFriend,
  } = require('../../controllers/userController');

  const userController = require('../../controllers/userController');


  router.route('/').get(getUsers)

  module.exports = router;