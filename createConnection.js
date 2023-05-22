import { MongoClient } from 'mongodb';

export async function createConnection() {
    const MONGO_URL = 'mongodb://localhost:27017';
    const client = new MongoClient(MONGO_URL);
    // try {
        await client.connect();
        console.log("Mongo is connnected 👍");
        return client;
    // } catch (e) {
    //     console.error(e);
    // } finally {
        // await client.close();
    // }
}
