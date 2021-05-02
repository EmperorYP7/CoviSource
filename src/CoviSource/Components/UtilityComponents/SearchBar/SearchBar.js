import React, { useState } from "react";
import propTypes from "prop-types";
import "./SearchBar.scss";
import Button from "components/CustomButtons/Button.js";
import { isMobile } from "CoviSource/UtilityFunctions";

SearchBar.propTypes = {
  tags: propTypes.arrayOf(String),
  callBackFunction: propTypes.func,
};

export default function SearchBar(props) {
  const { tags, callBackFunction } = props;
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

  const renderTags = function () {
    return (
      <ul className="tags">
        {tagData.map((tag, index) => (
          <li onClick={() => removeTagData(index)} key={index}>
            <span>{tag}</span>
            <span className="tag-close-icon">
              <i className="fas fa-times"></i>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="tag-input">
        <input
          id="searchbar-input"
          type="text"
          onKeyUp={(event) =>
            event.key === "Enter" ? addTagData(event) : null
          }
          placeholder="Search what you need"
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
      {renderTags()}
    </>
  );
}
