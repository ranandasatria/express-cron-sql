const { checkSchema } = require('express-validator');

exports.register = checkSchema({
  email: {
    isEmail: true,
    errorMessage: 'Email not valid',
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters',
    },
  },
}, ["body"]);

exports.login = checkSchema({
  email: {
    isEmail: true,
    errorMessage: 'Email not valid',
  },
  password: {
    notEmpty: true,
    errorMessage: "Password can't be empty",
  },
}, ["body"]);
