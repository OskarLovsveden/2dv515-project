import fs from "fs";

/**
 * Creates a directory at the given path.
 *
 * @param {string} path the path name / location
 */
const createDir = (path: string): void => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Creates a file at the given path / name.
 *
 * @param {string} path the path name / file name
 * @param {string} content the file contents
 */
const createFile = (path: string, content: string) => {
  try {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, content, "utf8");
    }
  } catch (error) {
    console.log(error);
  }
};

export { createDir, createFile };
