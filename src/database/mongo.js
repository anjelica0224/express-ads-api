const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');
let database = null;

async function startDatabase() {
    const mongo = await MongoMemoryServer.create();
    const mongoDBURL = await mongo.getUri();
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser : true});
    database = connection.db();
}
async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}
module.exports = {
    getDatabase,
    startDatabase,
};