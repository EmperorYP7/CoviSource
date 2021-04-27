import React from 'react';
import SearchBar from "material-ui-search-bar";
import "./Hero.scss";

function Hero() {
    return (
        <div className="hero">
            <div className="container" >
                <h1>CoviSource</h1>
            </div>
            <div className="container">
                <div className="search">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}

export default Hero;
