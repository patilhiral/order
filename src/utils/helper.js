import { writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const readJSON = async (filename) => {
  try {
    const filePath = path.join(__dirname, "..", "data", filename);
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    throw new Error("Failed to read files" + error.message);
  }
};

export const writeJSON = async (fileName, data) => {
  try {
    const filePath = path.join(__dirname, "..", "data", fileName);
    await writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Failed to read files" + error.message);
  }
};
