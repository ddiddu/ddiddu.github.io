import './style.css';

// FEEL FREE TO ADJUST THESE VALUES
const WIDTH = 700;
const HEIGHT = 700;
const TRANSLATE = 200;

// DO NOT MODIFY - BEGIN
const svg = document.getElementsByTagName("svg")[0];
svg.setAttribute("width", WIDTH.toString());
svg.setAttribute("height", HEIGHT.toString());

const gs = document.getElementsByTagName("g");
for (let i = 0; i < gs.length; i++) {
  const g = gs[i];
  g.setAttribute("transform", `translate(${TRANSLATE})`);
}

// Feel free to use this scaling function to determine the width of the bars
const scale = (value: number, min: number, max: number) => {
  return (value - min) * (WIDTH - TRANSLATE) / (max - min);
}
// DO NOT MODIFY - END

fetch("https://raw.githubusercontent.com/vega/vega/main/docs/data/movies.json")
.then(response => response.json())
// if using TypeScript, consider adding a type to the data parameter
.then((data) => {

  console.log(data);
  // ADD CODE HERE

  // END CODE HERE
})