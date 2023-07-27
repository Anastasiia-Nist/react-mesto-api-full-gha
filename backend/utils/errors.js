const statuses = {
  badRequest: 400,
  notFound: 404,
  default: 500,
  conflict: 409,
  forbidden: 403,
  unauthorized: 401,
};
const messages = {
  notFound: 'По указанному пути ничего не найдено',
  serverError: 'На сервере произошла ошибка',
  unauthorized: 'Необходима авторизация',
  user: {
    notFound: 'Пользователь по данному id не найден',
    loginBadData: 'Передан неверный логин или пароль',
    conflictEmail: 'Пользователь с указанным email уже существует',
  },
  card: {
    notFound: 'Карточка с указанным id не найдена',
    badData: 'Переданы некорректные данные при создании карточки',
    cannotDeleted: 'Вы можете удалять только свои карточки',
  },
};

module.exports = { statuses, messages };
