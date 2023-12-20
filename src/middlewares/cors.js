const cors = (allowedOrigins) => {
  return (req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-PINGOTHER"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, PATCH, POST, DELETE"
    );

    next();
  };
};

export { cors };
