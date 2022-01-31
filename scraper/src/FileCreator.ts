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

export { createDir };
