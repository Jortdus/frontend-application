import React from "react";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <span>Corona sewage particles per 100.000 residents</span>
        <form>
          <label htmlFor="vol">Aantal resultaten:</label>
          <input
            type="range"
            id="rangeInput"
            name="vol"
            min="4"
            max="25"
            value="10"
          ></input>
        </form>
      </div>
    </header>
  );
};

export default Header;
