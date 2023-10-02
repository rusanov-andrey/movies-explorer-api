/* eslint-disable max-classes-per-file */
const messages = require('../config/messages');

class MovieError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

class NotFoundError extends MovieError {
  constructor(message = messages.NOT_FOUND_ERROR) {
    super(404, message);
  }
}

class BadRequestError extends MovieError {
  constructor(message = messages.BAD_REQUEST_ERROR) {
    super(400, message);
  }
}

class NotAuthorizedError extends MovieError {
  constructor(message = messages.NOT_AUTHORIZES_ERROR) {
    super(401, message);
  }
}

class ForbidenError extends MovieError {
  constructor(message = messages.FORBIDEN_ERROR) {
    super(403, message);
  }
}

class ConflictError extends MovieError {
  constructor(message = messages.CONFLICT_ERROR) {
    super(409, message);
  }
}

class CommonError extends MovieError {
  constructor(message = messages.COMMON_ERROR) {
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
