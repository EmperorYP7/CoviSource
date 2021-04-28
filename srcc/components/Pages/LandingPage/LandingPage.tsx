import React from "react";
import SearchBar from "../../UtilityComponents/SearchBar/SearchBar";

export default function LandingPage() {
  const searchButtonClickHandler = function (e: any) {
    console.log("callback works");
  };
  return (
    <SearchBar
      tags={["Oxygen Cylinders"]}
      callBackFunction={searchButtonClickHandler}
    />
  );
}
