const { MongoClient } = require('mongodb')

// connects and disconnects from mongodb
async function main() {
    const uri = "mongodb+srv://Dev-94:Sanders_123@sei-dssjh.azure.mongodb.net/test?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await client.connect()
        await createListing(
            client,
            {
                name: "Doug",
                details: "PM role",
                location: "Epoch",
            }
        )
        // await listDatabases(client)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

main().catch(console.err)

// adds new document into collection, called above in main function
async function createListing(client, newListing) {
    const result = await client.db('SEI').collection('scheds').insertOne(newListing)
    console.log(result)
}


// lists databases to test if above function is really working
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases()

    console.log("Databases: ")
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}