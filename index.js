const express = require("express");
const { connectToServer } = require("./db.js");
// const { createListing, createMultipleListings } = require("./query/create");
// const { updateAllListingsToHavePropertyType } = require("./query/update");
const { deleteListingByName, deleteListingsScrapedBeforeDate } = require("./query/delete");
const app = express();

const data = [
  {
    name: "Infinite Views",
    summary: "Modern home with infinite views from the infinity pool",
    property_type: "House",
    bedrooms: 5,
    bathrooms: 4.5,
    beds: 5,
  },
  {
    name: "Private room in London",
    property_type: "Apartment",
    bedrooms: 1,
    bathroom: 1,
  },
  {
    name: "Beautiful Beach House",
    summary: "Enjoy relaxed beach living in this house with a private beach",
    bedrooms: 4,
    bathrooms: 2.5,
    beds: 7,
    last_review: new Date(),
  },
];

connectToServer(function (err) {
  if (err) {
    console.log(err);
  }
  app.get("/", (req, res) => {
    res.send("Hi!");
    //updateAllListingsToHavePropertyType();
    deleteListingsScrapedBeforeDate(new Date("2019-02-15"));
  });
  app.listen(8000, () => console.log("Server ready"));
});
