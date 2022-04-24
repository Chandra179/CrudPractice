const { getCollection } = require("../db.js");

async function updateListingByName(nameOfListing, updatedListing) {
  const listingsAndReviews = getCollection("listingsAndReviews");
  const result = await listingsAndReviews.updateOne(
    { name: nameOfListing },
    { $set: updatedListing }
  );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function upsertListingByName(nameOfListing, updatedListing) {
  const listingsAndReviews = getCollection("listingsAndReviews");
  const result = await listingsAndReviews.updateOne(
    { name: nameOfListing },
    { $set: updatedListing },
    /**
     * Without upsert, you'd first use findOne() to check if the document existed.
     * If the document existed, you'd use updateOne() to update the document.
     * If the document did not exist, you'd use insertOne() to create the document.
     * When you use upsert, you can combine all of that functionality into a single command.
     */
    { upsert: true }
  );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);

  if (result.upsertedCount > 0) {
    console.log(
      `One document was inserted with the id ${result.upsertedId._id}`
    );
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}

async function updateAllListingsToHavePropertyType() {
  const listingsAndReviews = getCollection("listingsAndReviews");
  const result = await listingsAndReviews.updateMany(
    /**
     * field name : property_type.
     * $exists : query operator to search for documents where the property_type field does not exist.
     * $set : update operator to set the property_type to "Unknown" for those documents.
     */
    { property_type: { $exists: false } },
    { $set: { property_type: "Unknown" } }
  );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

module.exports = {
  updateListingByName,
  upsertListingByName,
  updateAllListingsToHavePropertyType,
};
