


export  function notFoundMiddleware(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};





export  function errorHandlerMiddleware(err, req, res, next) {


  const errorResponse = res.statusCode ==200 ? 500 : res.statusCode;
  res.status(errorResponse).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });


}


