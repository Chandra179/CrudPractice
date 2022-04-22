const { getDb } = require("../db.js");

async function deleteListingByName(nameOfListing) {
  const listingsAndReviews = getDb("listingsAndReviews");
  const result = await listingsAndReviews.deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingsScrapedBeforeDate(client, date) {
    const listingsAndReviews = getDb("listingsAndReviews");
    const result = await listingsAndReviews.deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

module.exports = {
  deleteListingByName,
  deleteListingsScrapedBeforeDate
};


