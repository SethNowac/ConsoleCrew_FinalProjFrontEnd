// // Assuming you have installed the 'mongodb' package using npm or yarn
// const { MongoClient } = require('mongodb');

// // MongoDB connection string
// const uri = 'mongodb://localhost:27017';
// const dbName = 'your-database-name';

// // Create a MongoDB client
// const client = new MongoClient(uri);

// // Function to create a new user in MongoDB
// const createUser = async (user) => {
//   try {
//     // Connect to the MongoDB server
//     await client.connect();

//     // Access the database
//     const db = client.db(dbName);

//     // Access the collection
//     const collection = db.collection('users');

//     // Insert the user data
//     const result = await collection.insertOne(user);
//     console.log(`User created with ID: ${result.insertedId}`);
//   } catch (error) {
//     console.log('Error creating user:', error);
//     throw error;
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// };

// module.exports = { createUser };