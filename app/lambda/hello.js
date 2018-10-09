import fs from 'fs'
import MongoClient from 'mongodb'

const HTTPS_CREDS = {
  key: './ssl/server.key',
  cert: './ssl/server.crt',
}

const data = {
  body: {},
}
exports.handler = async function(event, context, callback) {
  console.log(event)
  console.log(context)
  await db.connect()
  callback(null, {
    statusCode: 200,
    header: '',
    body: `<h1>Hello, World!</h1><br/><h3>${data.body}</h3>`,
  })
}

const db = {
  uri: 'mongodb+srv://fcccolumbus614@gmail.com:fcccolumbus614%21@cluster0-mownj.mongodb.net/test?retryWrites=true',
  connect: () => {
    MongoClient.connect(
      db.uri,
      { ssl: true, sslKey: fs.readFileSync(HTTPS_CREDS.key), sslCert: fs.readFileSync(HTTPS_CREDS.cert) },
      (err, client) => {
        const collection = client.db('test').collection('devices')
        // perform actions on the collection object
        data.body = collection
        client.close()
      },
    )
  },
}
