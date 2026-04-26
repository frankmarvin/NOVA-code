import fs from "fs";
import path from "path";

export function getFileTree(dir) {
  return fs.readdirSync(dir).map(file => {
    const full = path.join(dir, file);
    return {
      name: file,
      path: full,
      isFolder: fs.statSync(full).isDirectory()
    };
  });
}

export function readFile(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

export function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}
