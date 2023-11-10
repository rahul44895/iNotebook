import { React, useState } from "react";
import noteContext from "../notes/NoteContext";

const host = "http://192.168.77.80:5000";

const NoteState = (props) => {
  // const s1 = {
  //     name: "Rahul Singh",
  //     class: "CS2",
  //   };
  //   const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "Name",
  //         class: "Class",
  //       });
  //     }, 1000);
  //   };
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  //GetNotes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDJhN2I3NTczN2JjNTc4ZWJhYzkzIn0sImlhdCI6MTY5OTU1NTk5Nn0.hcPiWWT7K7hlsEzn3sQOXgJuMQmlLVHrcoxHpyF2tX8",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //addNote
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDJhN2I3NTczN2JjNTc4ZWJhYzkzIn0sImlhdCI6MTY5OTU1NTk5Nn0.hcPiWWT7K7hlsEzn3sQOXgJuMQmlLVHrcoxHpyF2tX8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)
    setNotes([...notes, json]);
  };
  //deleteNote
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDJhN2I3NTczN2JjNTc4ZWJhYzkzIn0sImlhdCI6MTY5OTU1NTk5Nn0.hcPiWWT7K7hlsEzn3sQOXgJuMQmlLVHrcoxHpyF2tX8",
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //editNote
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDJhN2I3NTczN2JjNTc4ZWJhYzkzIn0sImlhdCI6MTY5OTU1NTk5Nn0.hcPiWWT7K7hlsEzn3sQOXgJuMQmlLVHrcoxHpyF2tX8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    //code to edit client side
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id == id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
      }
    }
    setNotes(newNote);
  };
  return (
    // <noteContext.Provider value={{state:state, update:update}}>{props.children}</noteContext.Provider>
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
