/*
 Authors:
 Your name and student #: Nicholas Chu A01193251
*/
const express = require("express");
const fs = require("fs")

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
var movieNames = []
var movieNamesLower = []
const name = "Nick"


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Add your implementation here
  let formData = req.body;
  const movieData = formData["MovieList"].split(', ')
  movieNames = movieData
  movieNamesLower = movieData.map(name => name.toLowerCase());
  res.render("pages/index", {Name: name, movieData: movieData, movieNamesLower: movieNamesLower});
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2 
  const moviequery = [movie1, movie2]
  res.render("pages/index", {Name: name, movieData: movieNames, movieNamesLower: moviequery})
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  const empty_error = "Movie Could Not Be Found"
  let search = req.params.movieName.toLowerCase
  fs.readFile("./movieDescriptions.txt", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let content = data.toString()
      const movies = content.split('\n')
      for (i = 0; i < movies.length; i++) {
        const content = movies[i].split(':')
        if (content[0].toLowerCase === search) {
          res.render("pages/searchResult", {movieTitle: content[0], movieDesc: content[1]});
          break;
        } else {
          res.render("pages/searchResult", {movieTitle: "", movieDesc: empty_error});
          break;
        }
      }
    }
  })
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});