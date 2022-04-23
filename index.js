const express = require("express");
const { connectToServer } = require("./db.js");
const { deleteListingById } = require("./query/delete");
const { createListing } = require("./query/create") 

const app = express();

app.get("/createonelisting", (req, res) => {
  res.send("createListing");
  createListing(
    {
      name: "Lovely Loft",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1
    }
  )
});

app.get("/deletebyid", (req, res) => {
  res.send("Hi!");
  deleteListingById("626388859ac091de621a26b0");
});

connectToServer(function (err, client) {
  if (err) {
    console.log(client)
    console.log ('error', err.message, err.stack)
  }
  app.listen(8000, () => console.log("Server ready"));
});
