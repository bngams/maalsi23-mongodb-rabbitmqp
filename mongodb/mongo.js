import { MongoClient } from "mongodb";  

//const url = "mongodb+srv://admin:admin@localhost:28117"
const url = "mongodb://localhost:28117"

// Initialize and store connexion
const client = new MongoClient(url);

const dbName = "video";

async function main(){
    await client.connect(); // mongosh

    const db = client.db(dbName); // use dbName
    const collection = db.collection('Movie');

    const res = await collection.find().toArray();
    console.log('res', res);

    return res;
} 


main()
  .then(r => console.log(r))
  .catch(e => console.log(e))