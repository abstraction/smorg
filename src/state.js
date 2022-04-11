import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getState = async (file) => {
  const dataBuffer = await fs.readFile(file);
  return JSON.parse(dataBuffer);
};

const saveState = async (data, file) => {
  const oldData = await getState(path.join(__dirname, "../dist/state.json"));
  const newData = { ...oldData, ...data };
  const json = JSON.stringify(newData);
  fs.writeFile(file, json)
    .then((res) => {
      console.log("Saved state JSON.");
    })
    .catch((e) => {
      console.log("Error saving state JSON.", e);
    });
};

export { getState, saveState };
