import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const envFilePath = path.join(__dirname, ".env");

function parseEnvFile(filePath) {
  const envData = fs.readFileSync(filePath, "utf8");
  const lines = envData.split("\n");
  const envVariables = {};

  for (let line of lines) {
    line = line.trim();
    if (line && !line.startsWith("#")) {
      const [key, value] = line.split("=");
      envVariables[key.trim()] = value.trim();
    }
  }

  return envVariables;
}

function loadEnvFile() {
  const absolutePath = path.resolve(envFilePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Environment file not found: ${envFilePath}`);
  }

  const envVariables = parseEnvFile(absolutePath);

  // Assign variables to process.env
  for (const key in envVariables) {
    process.env[key] = envVariables[key];
  }

  return envVariables;
}

export { loadEnvFile };
