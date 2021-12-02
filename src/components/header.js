import React from "react";

const Header = ({ rangeValue, setrangeValue }) => {
    const onchange = (e) => {
        setrangeValue(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };
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
                        value={rangeValue}
                        onChange={onchange}
                    ></input>
                </form>
            </div>
        </header>
    );
};

export default Header;
