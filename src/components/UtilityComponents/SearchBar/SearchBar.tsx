import { type } from "node:os";
import React, { useState, MouseEventHandler } from "react";
import { JsxChild } from "typescript";
import "./SearchBar.scss";

type SearchProps = {
  tags: string[];
  callBackFunction: MouseEventHandler;
};

export default function SearchBar({ tags, callBackFunction }: SearchProps) {
  const [tagData, setTagData] = useState(tags);
  const removeTagData = (indexToRemove: Number) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = (event: any) => {
    if (event.target.value !== "") {
      setTagData([...tagData, event.target.value]);
      event.target.value = "";
    }

    let input: any = document.getElementById("searchbar-input");
    input.placeholder = "Enter Requirements...";
  };
  return (
    <div className="tag-input">
      <ul>
        {tagData.map((tag, index) => (
          <li onClick={() => removeTagData(index)} key={index} className="tag">
            <p>{tag}</p>
            <span className="tag-close-icon">
              <i className="fas fa-times"></i>
            </span>
          </li>
        ))}
      </ul>
      <input
        id="searchbar-input"
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTagData(event) : null)}
        placeholder="Enter requirements and press enter"
      />
      <button onClick={callBackFunction}>Search</button>
    </div>
  );
}
