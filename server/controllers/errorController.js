/*
    errorController is used to handle errors that occur throughout the application
    In app.js errorHandler is passed into a middleware function to handle any Errors that end up there
    
*/

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default errorHandler;
