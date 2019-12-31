const { MongoClient } = require('mongodb')

// connects and disconnects from mongodb
async function main() {
    const uri = "mongodb+srv://Dev-94:Sanders_123@sei-dssjh.azure.mongodb.net/test?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await client.connect()
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

main().catch(console.err)

// lists databases to test if above function is really working
