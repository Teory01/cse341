const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
      lowercase: true,
      trim: true
    },
    favoriteColor: {
      type: String,
      required: [true, 'Favorite color is required'],
      trim: true
    },
    birthday: {
      type: String,
      required: [true, 'Birthday is required']
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Contact', contactSchema);