// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const keys = require('../config/keys');
// // import keys from '../config/keys';
// const { User } = require('../models/index');

// const requireAuth = async (req, res, next) => {
//   const authorization = req.get('authorization');
//   // authorization === Bearer ewefwegwrherhe
//   if (!authorization) {
//     return res.status(401).json({ error: 'you must be logged in' });
//   }
//   const token = authorization.replace('Bearer ', '');
//   jwt.verify(token, keys.jwt.secret, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: 'you must be logged in' });
//     }
//     const { id } = payload;
//     User.findById(id).then((userdata) => {
//       req.user = userdata;
//       next();
//     });
//   });
// };

// module.exports = requireAuth;
