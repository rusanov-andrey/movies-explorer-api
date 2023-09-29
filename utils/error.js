/* eslint-disable max-classes-per-file */

class MovieError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

class NotFoundError extends MovieError {
  constructor(message = 'Ресурсс не найден') {
    super(404, message);
  }
}

class BadRequestError extends MovieError {
  constructor(message = 'Переданы некорректные данные') {
    super(400, message);
  }
}

class NotAuthorizedError extends MovieError {
  constructor(message = 'Неправильные почта или пароль') {
    super(401, message);
  }
}

class ForbidenError extends MovieError {
  constructor(message = 'Нет прав') {
    super(403, message);
  }
}

class ConflictError extends MovieError {
  constructor(message = 'Нарушена уникальность') {
    super(409, message);
  }
}

class CommonError extends MovieError {
  constructor(message = 'Ошибка сервера') {
    super(500, message);
  }
}

module.exports = {
  MovieError,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  ForbidenError,
  ConflictError,
  CommonError,
};
