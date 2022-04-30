import { getState, saveStateOverwrite } from "./state.js";
import { getNotes } from "./notes.js";
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
let markers = "";
let pathmd5 = "";

stateKey.forEach((key) => {
  const isNoteFound = notesKey.find((duplicateKey) => duplicateKey === key);
  if (!isNoteFound) {
    markers += state[key].marker + "\n";
    pathmd5 += state[key].pathMd5 + "\n";
    delete state[key];
  } else {
    tempNote[key] = { ...notes[key] };
  }
});

const purgeCount = stateKey.length - Object.keys(state).length;

// FIXME Had a weird situation where some exisiting files were marked as deleted
// for some reason. Happened only ones. Make sure see code if that happens again
if (purgeCount > 0) {
  saveStateOverwrite(tempNote, path.join(__dirname, "../dist/state.json"));

  Promise.all([
    fs.writeFile(path.join(__dirname, "../dist/purged-markers.txt"), markers),
    fs.writeFile(path.join(__dirname, "../dist/purged-pathmd5.txt"), pathmd5),
  ])
    .then(() => {
      console.log(
        `Purged ${
          stateKey.length - Object.keys(state).length
        } files. Check purged-markers.txt for list to find`
      );
    })
    .catch((e) => {
      console.log(e);
    });
} else {
  console.log("Nothing to purge");
}
