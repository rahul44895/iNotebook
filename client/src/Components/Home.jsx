import React from "react";
import Notes from "./Notes";

export const Home = ({setAlertText}) => {
  return (
    <>
      <Notes setAlertText={setAlertText}/>
    </>
  );
};
