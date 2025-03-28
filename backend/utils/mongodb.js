import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    maxPoolSize: 10,
});

let dbConnection;

async function connectToMongoDB() {
    if (!dbConnection) {
        console.log("trying to connect to mongodb for the first time")
        try {
            await client.connect();
            console.log("connected to Mongodb");

            dbConnection = client.db('fitnessApp');

            await dbConnection.collection("users").createIndex({ email: 1 }, { unique: true });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    return dbConnection;
}

async function closeMongodbConnection() {
    try {
        await client.close();
        console.log("Mongodb connection closed\n");
    } catch (err) {
        console.error(err);
    }
}

export default { connectToMongoDB, closeMongodbConnection };
