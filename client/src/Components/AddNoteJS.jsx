import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/NoteContext";
export default function AddNoteJS(props) {
  const contextVal = useContext(noteContext);
  const { addNote } = contextVal;
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(notes.title, notes.description, notes.tag);
    setNotes({ title: "", description: "", tag: "" });
    props.setAlertText("Added Note Successfully", "success");
  };
  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h1>Add Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={notes.title}
              onChange={onChange}
              aria-describedby="emailHelp"
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={notes.description}
              onChange={onChange}
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={notes.tag}
              onChange={onChange}
            />
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={notes.title.length < 5 || notes.description.length < 5}
          >
            Add note
          </button>
        </form>
      </div>
    </>
  );
}
