export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({
      success: false,
      message: err.message,
      errorsList: err.errorsList.map((e) => e.msg),
    });
  } else {
    next(er);
  }
};
