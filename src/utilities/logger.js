import url from "url";

const logger = async (req, res, next) => {
  const { method, url: requestUrl } = req;
  const parsedUrl = url.parse(requestUrl, true);

  const start = new Date();

  res.on("finish", () => {
    const end = new Date();
    const duration = Number(end - start).toFixed(2);
    const statusCode = res.statusCode;
    const responseSize = res.getHeader("Content-Length");

    let coloredStatusCode;
    if (statusCode >= 200 && statusCode < 300) {
      coloredStatusCode = `\x1b[32m${statusCode}\x1b[0m`; // Green color for 2xx status codes
    } else if (statusCode >= 300 && statusCode < 400) {
      coloredStatusCode = `\x1b[36m${statusCode}\x1b[0m`; // Cyan color for 3xx status codes
    } else if (statusCode >= 400 && statusCode < 500) {
      coloredStatusCode = `\x1b[33m${statusCode}\x1b[0m`; // Yellow color for 4xx status codes
    } else if (statusCode >= 500) {
      coloredStatusCode = `\x1b[31m${statusCode}\x1b[0m`; // Red color for 5xx status codes
    } else {
      coloredStatusCode = statusCode; // Default color for other status codes
    }

    const date = new Date(new Date().getTime() + 2 * 3600 * 1000)
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    const logMessage = `${method} ${parsedUrl.pathname} ${coloredStatusCode} ${duration} ms ${responseSize} bytes ${date}`;

    const didNotChangeLogMessage = `${method} ${parsedUrl.pathname} ${coloredStatusCode} ${duration} ms ${date}`;

    console.log(statusCode === 304 ? didNotChangeLogMessage : logMessage);
  });

  next();
};

export { logger };
