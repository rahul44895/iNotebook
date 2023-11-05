const express = require("express");
const router = express.Router();
const decodeToken = require("../middlewares/decodeToken");
const { body, validationResult } = require("express-validator");
const NotesSchema = require("../models/Notes");

//adding a new note using POST api method. Login required
router.post(
  "/addNote",
  decodeToken,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    const notes = new NotesSchema({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const savedNote = await notes.save();
    res.json(savedNote);
  }
);

//fetching all notes using POST api method. Login required
router.post("/fetchallnotes", decodeToken, async (req, res) => {
  const notes = await NotesSchema.find({ user: req.user.id });
  res.send(notes);
});

//updating a particular note using PUT api method. Login required
router.put("/updatenote/:id", decodeToken, async (req, res) => {
  const note = await NotesSchema.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(400).send("Not Allowed");
  }
  const { title, description, tag } = req.body;
  let newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;
  const savedNote = await NotesSchema.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.send(savedNote);
});
//deletign a particular note using DELETE api method. Login required
router.delete("/deletenote/:id", decodeToken, async (req, res) => {
  const note = await NotesSchema.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Note not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(400).send("Not Allowed");
  }

  const savedNote = await NotesSchema.findByIdAndDelete(req.params.id);
  res.send(savedNote);
});
module.exports = router;
