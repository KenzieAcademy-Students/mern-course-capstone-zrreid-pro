const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: true
  },
  passwordHash: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  avatar: [ Number ],
  project_list: [
      {
          type: ObjectId,
          ref: 'Project'
      }
  ]
});

const User = mongoose.model('User', userSchema);


module.exports = User;
