const mongoose = require("mongoose");
const Data = require("./data.js");
const Listing = require("../models/listing.js");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const dbUrl = process.env.MONGO_DB_URL;
main()
  .then(() => {
    console.log(dbUrl);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Data base connected!")
}

const initDB = async () => {
  try {
    let ownerId = "67a76172565628561622a2de";
    const transformedData = Data.map((item) => ({
      title: item.title,
      description: item.description,
      image: {
        filname: item.image.filename,
        url: item.image.url
      },
      price: item.price,
      location: item.location,
      country: item.country,
      owner: ownerId
    }));

    await Listing.insertMany(transformedData);
    console.log("data was initialized");
  } catch (err) {
    console.log("Error inserting multiple data:", err);
  }
};

initDB();

const findData = async () => {
  try {
    let id = '6797b53edb38e654a65e6789';
    const listing = await Listing.findById(id).populate('owner');
    console.log(listing.owner); // Should display the full user document

  } catch (err) {
    console.log(err);
  }
};

// findData();