/*
    - AppError is a custom error handling class for operational errors that can occur throughout the application
    - When a new object is created from AppError we pass the error message & status code (e.g 404)
    - AppError extens the Error class, hence we pass the message into super()

    - This allows for cleaner error calls throughout the application code

    - Usage: new AppError("Message", statusCode)

*/

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "Failure" : "Error";
    this.isOperational = true;

    // Caputure the point at which the error occured and omit the call of the function from the stack
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
