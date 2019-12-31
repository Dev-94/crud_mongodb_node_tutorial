const { MongoClient } = require('mongodb')

// connects and disconnects from mongodb
async function main() {
    const uri = "mongodb+srv://Dev-94:Sanders_123@sei-dssjh.azure.mongodb.net/test?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await client.connect()
        await updateAllListingsToHaveLocation(client)

        // await findOneListingByName(client, "Dan")
        // await upsertListingByName(client, "Dan", { name: "Dn" })
        // await findOneListingByName(client, "Dn")

        // await findOneListingByName(client, "Doug")
        // await updateListingByName(client, "Doug", { name: "Dog" })
        // await findOneListingByName(client, "Dog")

        // await findListingsForGivenLocation(client, 'Epoch')
        // await findOneListingByName(client, "Doug")
        // await createMultipleListings(
        //     client,
        //     [{
        //         name: 'Drew',
        //         details: 'coffee',
        //         location: 'Thunderbird',
        //     },
        //     {
        //         name: 'Don',
        //         details: 'lunch',
        //         location: 'Cosmo'
        //     }]
        // )
        // await createListing(
        //     client,
        //     {
        //         name: "Doug",
        //         details: "PM role",
        //         location: "Epoch",
        //     }
        // )
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
    console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function createMultipleListings(client, newListings) {
    const result = await client.db('SEI').collection('scheds').insertMany(newListings)
    // console.log(newListings)
    console.log(`${result.insertedCount} new listing(s) created with the following id(s): `)
    console.log(result.insertedIds)
}

// displays first listing that corresponds to given name
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db('SEI').collection('scheds').findOne({ name: nameOfListing })
    if (result) {
        console.log(`Yay! Found a listing in the collection with the name: ${nameOfListing}`)
        console.log(result)
    } else {
        console.log(`No listing in the collection with the name: ${nameOfListing}`)
    }
}

// seaches for listings with a specified location
async function findListingsForGivenLocation(client, locationOfListing) {
    const cursor = await client.db('SEI').collection('scheds').find({ location: locationOfListing })
    const results = await cursor.toArray()
    if (results.length > 0) {
        console.log(`Yay! There are listings in the collection are specified for the location: ${locationOfListing}.`)
        results.forEach((result) => console.log(result))
        // console.log(results)
    } else {
        console.log(`No listings in the collection are specified for the location: ${locationOfListing}`)
    }
}

// updates single listing by name
async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db('SEI').collection('scheds').updateOne(
        { name: nameOfListing },
        { $set: updatedListing }
    )
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} document(s) was/were updated`)
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db('SEI').collection('scheds').updateOne(
        { name: nameOfListing },
        { $set: updatedListing },
        { upsert: true }
    )

    console.log(`${result.matchedCount} document(s) matched the query criteria`)

    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`)
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated`)
    }
}

async function updateAllListingsToHaveLocation(client) {
    const result = await client.db('SEI').collection('scheds').updateMany({ location: { $exists: false } },
        { $set: { location: "Unknown" } }
    )
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} document(s) was/were updated`)
}


async function deleteListingByName(client, nameOfListing) {

}

// lists databases to test if above function is really working
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases()

    console.log("Databases: ")
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}