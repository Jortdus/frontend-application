import React from "react";

const Header = ({ rangeValue, setrangeValue }) => {
    const onchange = (e) => {
        setrangeValue(e.currentTarget.value);
    };
    return (
        <header>
            <div className="form">
                <form>
                    <label htmlFor="vol">
                        Aantal getoonde resultaten: {rangeValue}
                    </label>
                    <br />
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
