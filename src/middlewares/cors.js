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

    // Include the credentials option in Access-Control-Allow-Origin
    res.header("Vary", "Origin");

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, HEAD, PUT, PATCH, POST, DELETE"
      );
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.status(200).end();
      return;
    }

    next();
  };
};

export { cors };
