import React from "react";
import "./dropdown.css";

export default function DropDown({ arrayOfObjects, onChange }) {
  return (
    <div>
      <select className="dropdown" onChange={onChange}>
        {arrayOfObjects.map((val, index) => {
          return (
            <option value={val.name} key={index}>
              {val.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
