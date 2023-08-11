const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messages } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'БД: Некорректый email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Кот',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь дивана',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://proprikol.ru/wp-content/uploads/2020/07/prikolnye-kartinki-zlyh-kotov-17.jpg',
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'БД: Некорректный URL',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.user.notFound);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.user.loginBadData);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
