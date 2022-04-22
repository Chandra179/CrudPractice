const { getDb } = require("../db.js");

/**
 * Create a new Airbnb listing
 * @param {Object} newListing The new listing to be added
 */
async function createListing(newListing) {
  const listingsAndReviews = getDb("listingsAndReviews");
  const result = await listingsAndReviews.insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

/**
 * Create multiple Airbnb listings
 * @param {Object[]} newListings The new listings to be added
 */
async function createMultipleListings(newListings) {
  const listingsAndReviews = getDb("listingsAndReviews");
  const result = await listingsAndReviews.insertMany(newListings);

  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
}

module.exports = {
  createListing,
  createMultipleListings,
};
