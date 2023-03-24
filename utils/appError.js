class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.StatusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
    console.log(this.stack);
  }
}

module.exports = AppError;