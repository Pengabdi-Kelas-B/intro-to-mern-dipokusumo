const mongoose = require("mongoose");
const fs = require('fs');
require("dotenv").config();

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: Array,
    description: String,
    director: String,
    cast: Array
  }, { collection: collection, strict: false });

  const Movie = mongoose.model('Movie', movieSchema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
    case "reset-db":
      await resetDB(Movie);
      break;
    case "bulk-insert":
      await bulkInsert(Movie);
      break;
    case "get-all":
      await getAll(Movie);
      break;
    default:
      throw Error("Command not found. Use: check-db-connection, reset-db, bulk-insert, or get-all");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

async function resetDB(Movie) {
  try {
    await Movie.deleteMany({});
    console.log('Database has been reset!');
  } catch (err) {
    console.error('Failed to reset the database:', err);
  }
}

async function bulkInsert(Movie) {
  try {
    const data = JSON.parse(fs.readFileSync('./seed.json', 'utf-8'));
    await Movie.insertMany(data);
    console.log('Bulk insert successful!');
  } catch (err) {
    console.error('Bulk insert failed:', err);
  }
};

async function getAll(Movie) {
  try {
    const movies = await Movie.find({});
    console.log('All Movies:', movies);
  } catch (err) {
    console.error('Failed to get all data:', err);
  }
}

main();
