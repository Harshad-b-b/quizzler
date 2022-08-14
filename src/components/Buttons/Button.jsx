import React from "react";
import "./button.css";
export default function Button({ text, onClickEvent }) {
  return (
    <button className="Custombutton" role="button" onClick={onClickEvent}>
      {text}
    </button>
  );
}
