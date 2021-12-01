import compiledData from "./dataCompile";

let rawData = compiledData();

function calcHeight() {
  return rawData.map((e) => {
    return Math.floor(e[0] / 1000000000);
  });
}

export default calcHeight;
