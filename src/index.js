import { getNotes } from "./notes.js";
import { getState, saveState } from "./state.js";
import { createXml } from "./sm.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NOTES_PATH = "/Users/sage/o";
const IGNORE_DIR = [".attach", ".git", ".stfolder", "assets", ".obsidian"];
const IGNORE_FILES = [];
const notes = await getNotes(NOTES_PATH, IGNORE_DIR, IGNORE_FILES);
const state = await getState(path.join(__dirname, "../dist/state.json"));
const notesKey = Object.keys(notes);
const stateKey = Object.keys(state);
const tempNote = {};

notesKey.forEach((key) => {
  const isNoteAlreadyAdded = stateKey.find(
    (duplicateKey) => duplicateKey === key
  );
  if (!isNoteAlreadyAdded) {
    tempNote[key] = { ...notes[key] };
  }
});

// if (tempNote) console.log(tempNote);

saveState(tempNote, path.join(__dirname, "../dist/state.json"));

const resXML = createXml(tempNote);
console.log(resXML);

fs.writeFile(path.join(__dirname, "../dist/export.xml"), resXML)
  .then((res) => {
    console.log("Saved XML");
  })
  .catch((e) => {
    console.log("Error", e);
  });
