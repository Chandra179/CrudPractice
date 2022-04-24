const { getCollection } = require("../db.js");

async function deleteListingByName(nameOfListing) {
  const listingsAndReviews = getCollection("listingsAndReviews");
  const result = await listingsAndReviews.deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingById(idOfListing) {
  const listingsAndReviews = getCollection("listingsAndReviews");
  const result = await listingsAndReviews.deleteOne({
    _id: { $lt: idOfListing },
  });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingsScrapedBeforeDate(date) {
  const listingsAndReviews = getCollection("listingsAndReviews");
  const result = await listingsAndReviews.deleteMany({
    last_scraped: { $lt: date },
  });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

module.exports = {
  deleteListingByName,
  deleteListingById,
  deleteListingsScrapedBeforeDate,
};