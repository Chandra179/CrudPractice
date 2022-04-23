const express = require("express");
const { connectToServer } = require("./db.js");
const { deleteListingsScrapedBeforeDate } = require("./query/delete");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi!");
  deleteListingsScrapedBeforeDate(new Date("2019-02-16"));
});

connectToServer(function (err, client) {
  if (err) {
    console.log(client)
    console.log ('error', err.message, err.stack)
  }
  app.listen(8000, () => console.log("Server ready"));
});
