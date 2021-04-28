import React from "react";
import "./Main.scss";
import Hero from "./UtilityComponents/Hero/Hero";
import SearchBar from "./UtilityComponents/SearchBar/SearchBar";
import LandingPage from "./Pages/LandingPage/LandingPage";
// import __pages__ from "./pages"         *landingpage, resource provider page ...

function Main() {
  return (
    <div className="main">
      <LandingPage />
    </div>
  );
}

export default Main;
