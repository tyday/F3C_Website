const handler = (event, context, callback) => {
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: 'Hello, World',
  })
}

export default handler
