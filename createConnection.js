// import { MongoClient } from 'mongodb';

import mongoose, { Schema } from 'mongoose';


export function createConnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/task')
    .then(() => console.log('Connected!'));
}
   























// }




//  export function createConnection() {
    // const MONGO_URL = 'mongodb://localhost:27017';
    // const client = new MongoClient(MONGO_URL);
    // // try {
    //     await client.connect();
    //     console.log("Mongo is connnected 👍");
    //     return client;
    // // } catch (e) {
    // //     console.error(e);
    // // } finally {
    //     // await client.close();
    // // }


    
// }

