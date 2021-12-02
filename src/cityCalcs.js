import compiledData from "./dataCompile";

let rawData = compiledData();

function cityCalc() {
    return rawData.map((e) => {
        return e[1];
    });
}

export default cityCalc;
