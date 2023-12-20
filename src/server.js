import mongoose from "mongoose";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;

const server = app.listen(PORT);

const databaseName = process.env.MONGO_DB;

const capitalizedDatabaseName =
  databaseName.charAt(0).toUpperCase() + databaseName.slice(1);

server.on("listening", async function () {
  try {
    await mongoose.connect(mongoURI);
    console.info(`Connected to ${capitalizedDatabaseName}'s MongoDB`);
  } catch (error) {
    console.error(
      `Unable to connect to the ${capitalizedDatabaseName} database: ${error.message}`
    );
  }
  console.info(`Api is listening on port ${PORT}`);
});
