import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/NoteContext";
import AddNoteJS from "./AddNoteJS";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {

  const navigate = useNavigate();

  const contextVal = useContext(noteContext);
  const { notes, getNotes, editNote } = contextVal;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();}
    else{
      navigate('/login');
    }
  }, []);

  const [newNotes, setNewNotes] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const closeRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    closeRef.current.click();
    editNote(
      newNotes.id,
      newNotes.etitle,
      newNotes.edescription,
      newNotes.etag
    );
    props.setAlertText("Edited Successfully", "success");
  };
  const onChange = (e) => {
    setNewNotes({ ...newNotes, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const updatenote = (currNote) => {
    ref.current.click();
    setNewNotes({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag,
    });
  };
  return (
    <>
      <AddNoteJS setAlertText={props.setAlertText} />

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    aria-describedby="emailHelp"
                    value={newNotes.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={newNotes.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={newNotes.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={newNotes.etitle.length<5 || newNotes.edescription.length<5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-3">
        <div className="container my-3">
          <h2>Your Notes</h2><br/>
          {notes.length == 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              note={note}
              updatenote={() => {
                updatenote(note);
              }}
              key={note._id}
            />
          );
        })}
      </div>
    </>
  );
}
