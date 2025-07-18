import path from "path";
import express from "express";
import { loadEnvFile } from "./utilities/loadEnvFile.js";
import { cors } from "./middlewares/cors.js";
import { logger } from "./utilities/logger.js";

loadEnvFile();

// Routers
import { propertiesRouter } from "./features/properties/routes/propertyRoutes.js";
import { usersRouter } from "./features/users/routes/userRoutes.js";
import { faultsRouter } from "./features/faults/routes/faultRoutes.js";
import { applicationsRouter } from "./features/applications/routes/applicationRoutes.js";
import { visitorsRouter } from "./features/visitors/routes/visitorsRoutes.js";
import { authRouter } from "./features/auth/routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(logger);

app.use(cors(["http://localhost:5173", "https://admin.quattro.properties"]));

app.use(express.static(path.join("public")));

// Routes
app.use("/v1/properties", propertiesRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/faults", faultsRouter);
app.use("/v1/applications", applicationsRouter);
app.use("/v1/visitors", visitorsRouter);
app.use("v1/auth", authRouter);

export { app };
