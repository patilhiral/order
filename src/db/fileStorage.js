import { promises as fs } from "fs";
import path from "path";

const createFileService = () => {
  const baseDir = path.join(process.cwd(), "src", "data");
  return {
    read: async (fileName) => {
      const filePath = path.join(baseDir, fileName);
      try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        throw Error(`Failed to read file ${fileName}: ${error.message}`);
      }
    },
    write: async (fileName, data) => {
      const filepath = path.join(baseDir, fileName);
      return await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    },
  };
};
export default createFileService;
