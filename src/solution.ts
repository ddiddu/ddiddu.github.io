import './style.css';

const movie = {
  "Title": "Twin Falls Idaho",
  "US Gross": 985341,
  "Worldwide Gross": 1027228,
  "US DVD Sales": null,
  "Production Budget": 500000,
  "Release Date": "Jul 30 1999",
  "MPAA Rating": "R",
  "Running Time min": null,
  "Distributor": "Sony Pictures Classics",
  "Source": "Original Screenplay",
  "Major Genre": "Drama",
  "Creative Type": "Contemporary Fiction",
  "Director": "Michael Polish",
  "Rotten Tomatoes Rating": 77,
  "IMDB Rating": 7.1,
  "IMDB Votes": 2810
}

type Movie = typeof movie;

const WIDTH = 700;
const HEIGHT = 700;
const TRANSLATE = 200;

const svg = document.getElementsByTagName("svg")[0];
svg.setAttribute("width", WIDTH.toString());
svg.setAttribute("height", HEIGHT.toString());

const gs = document.getElementsByTagName("g");
for (let i = 0; i < gs.length; i++) {
  const g = gs[i];
  g.setAttribute("transform", `translate(${TRANSLATE})`);
}

const scale = (value: number, min: number, max: number) => {
  return (value - min) * (WIDTH - TRANSLATE) / (max - min);
}

fetch("https://raw.githubusercontent.com/vega/vega/main/docs/data/movies.json")
.then(response => response.json())
.then((data: Movie[]) => {

  console.log(data);
  
  const genreCount: Record<string, number> = {};

  data.forEach((movie) => {
    const genre = movie["Major Genre"];
    if (genreCount[genre]) {
      genreCount[genre]++;
    } else {
      genreCount[genre] = 1;
    }
  });

  const values = Object.values(genreCount);
  const max = Math.max(...values);
  const min = 0;

  Object.entries(genreCount).forEach(([genre, count], index) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", (index * 40).toString());
    rect.setAttribute("width", scale(count, min, max).toString());
    rect.setAttribute("height", "30");
    rect.setAttribute("fill", "steelblue");
    gs[1].appendChild(rect);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "0");
    text.setAttribute("y", (index * 40).toString());
    text.setAttribute("text-anchor", "end");
    text.textContent = genre + " (" + count + ")";
    gs[0].appendChild(text);
  })
  gs[0].setAttribute("transform", `translate(${TRANSLATE - 10}, 20)`);
})