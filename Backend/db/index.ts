import {MongoClient} from 'mongodb';
import initialJSONData from './neighborhoods_data.json';

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = 'neighborhoodsDB';

const connectDB = async () => {
    try {
        await client.connect();
        await initInitialData();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        await client.close();
        process.exit(1);
    }
}

const initInitialData = async () => {
    try {
        const database = client.db(dbName);
        const collection = database.collection('neighborhoods');
        // Check if the collection is empty
        const count = await collection.countDocuments();
        if (count > 0) {
            return;
        }
        const result = await collection.insertMany(initialJSONData);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (e) {
        console.error(e);
    } finally {
    }
}

export {client, connectDB, dbName};
