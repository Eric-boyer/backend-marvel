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

require("dotenv").config();

const ApiKey = process.env.ApiKey;

app.get("/comics", async (req, res) => {
  try {
      const {title,skip} = req.query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${ApiKey}&title=${title}&skip=${skip}`
    );
    res.json(response.data);

    
   // console.log(response.data);
     //console.log(req.query.title);
  } catch (error) {
    console.log(error.response);
  }
});
app.get("/comics/:characterId", async (req, res) => {
  const charactereId = req.params.characterId;
  const response = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/comics/${charactereId}?apiKey=${ApiKey}`
  );
  res.json(response.data);
});
app.get("/characters", async (req, res) => {
  try {
    const { name, skip } = req.query;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${ApiKey}&name=${name}&skip=${skip}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});
app.get("/character/:characterId", async (req, res) => {
  const id = req.params.characterId;
  const response = await axios.get(
    `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${ApiKey}`
  );
  res.json(response.data);
});
app.get("/", async (req, res) => {
  res.json("welcome to my backend");
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
