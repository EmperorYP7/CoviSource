import React, { useState, MouseEventHandler } from "react";
import "./SearchBar.scss";
import Button from "components/CustomButtons/Button.js";
import { isMobile } from "CoviSource/UtilityFunctions";

type SearchProps = {
  tags: string[],
  callBackFunction: MouseEventHandler,
};

export default function SearchBar({ tags, callBackFunction }: SearchProps) {
  const [tagData, setTagData] = useState(tags);
  const onSearchButtonClick = callBackFunction;
  const removeTagData = (indexToRemove) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };
  const addTagData = (event) => {
    if (event.target.value !== "") {
      setTagData([...tagData, event.target.value]);
      event.target.value = "";
    }

    let input = document.getElementById("searchbar-input");
    input.placeholder = "Enter Requirements...";
  };
  return (
    <div className="tag-input">
      <ul>
        {tagData.map((tag, index) => (
          <li key={index}>
            <span>{tag}</span>
            <span
              className="tag-close-icon"
              onClick={() => removeTagData(index)}
            >
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
      <Button
        size={isMobile() ? "sm" : "lg"}
        onClick={onSearchButtonClick}
        color="primary"
        value="Search"
      >
        Search
      </Button>
    </div>
  );
}
