const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const moongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(formidable());
app.use(morgan("dev"));

const ApiKey = process.env.ApiKey;

app.get("/comics", async (req, res) => {
  try {
    let limit = 100;
    let page = 1;
    if (req.query.page < 1) {
      page = 1;
    } else {
      page = req.query.page;
    }

    let skip = (page - 1) * limit;

    let title;
    if (req.query.title) {
      title = req.query.title;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${ApiKey}&limit=${limit}&page=${page}&skip=${skip}&title=${title}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});
app.get(" /comics/:characterId", async (req, res) => {
  const charactereId = req.params.characterId;
  const response = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/comics/${charactereId}?apiKey=${ApiKey}`
  );
  res.json(response.data);
});
app.get("/characters", async (req, res) => {
try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${ApiKey}`
      );
      res.json(response.data);
    
} catch (error) {
    console.log(error.response)
}


});
app.get("/character/:characterId", async (req, res) => {
  const id = req.params.characterId;
  const response = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${ApiKey}`
  );
  res.json(response.data);
});

console.log(ApiKey);
app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});
//conso
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
