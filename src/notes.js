import path from "path";
import fs from "fs/promises";
// import md5File from "md5-file";
import md5 from "md5";

const notes = {};
const getNotes = async (directory, toIgnoreDir, toIgnoreFile) => {
  try {
    const children = await fs.readdir(directory, { withFileTypes: true });
    for (const child of children) {
      if (child.isFile()) {
        if (
          path.extname(child.name) === ".org" &&
          !toIgnoreFile.includes(child.name)
        ) {
          const noteAbsolutePath = path.join(directory, child.name);
          notes[noteAbsolutePath] = {
            name: child.name,
            marker: md5("org-mode"),
            pathMd5: md5(noteAbsolutePath),
            // fileMd5: md5File(noteAbsolutePath),
          };
        }
      } else if (!toIgnoreDir.includes(child.name)) {
        getNotes(path.join(directory, child.name), toIgnoreDir, toIgnoreFile);
      }
    }
  } catch (e) {
    throw new Error(`An error has occured while getting files ${e}`);
  }
  return notes;
};

export { getNotes };
