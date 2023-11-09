import React, { useContext } from "react";
import noteContext from "../Context/notes/NoteContext";

export default function NoteItem(props) {
  const contextVal = useContext(noteContext);
  const { deleteNote, editNote } = contextVal;
  const { note, updatenote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash m-2"
              onClick={() => deleteNote(note._id)}
            ></i>
            <i
              className="fa-regular fa-pen-to-square m-2"
              onClick={() =>
                // editNote(note._id, "MeowTitle267", note.description, note.tag)
                updatenote(note)
              }
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
