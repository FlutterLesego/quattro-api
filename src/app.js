import express from "express";
import { loadEnvFile } from "./utilities/loadEnvFile.js";
import { cors } from "./middlewares/cors.js";
import { logger } from "./utilities/logger.js";

loadEnvFile();

// Routers
import { propertiesRouter } from "./features/properties/routes/propertyRoutes.js";
import { usersRouter } from "./features/users/routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(logger);

app.use(cors(["http://localhost:5173", "https://app.quattro.properties"]));

// Routes
app.use("/v1/properties", propertiesRouter);
app.use("/v1/users", usersRouter);

export { app };
