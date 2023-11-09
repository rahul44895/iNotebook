import React, { useContext, useEffect } from "react";
// import noteContext from "../Context/notes/NoteContext";

export const About = () => {
  // const contextData = useContext(noteContext);
  // useEffect(()=>{
  //   contextData.update();
  // },[])
  return (
    <div className="container my-3">
      <div>This is about page</div>
      {/* <div>{contextData.state.name}{contextData.state.class}</div> */}

    </div>
  );
};
