import Covid from "./data/covid.json";

function compiledData(range) {
  return Covid.reduce((cityValue, e) => {
    // filtering out empty results
    if (e["RNA_flow_per_100000"] === 0) {
      return cityValue;
    }
    // creating a new array containing objectes with particles, location and date
    return cityValue.concat({
      particles: e["RNA_flow_per_100000"],
      location: e["RWZI_AWZI_name"],
      date: e["Date_measurement"],
    });
  }, [])
    .slice(0, range ? range : 10)
    .map((e) => [e.particles, e.location]);
}

export default compiledData;
