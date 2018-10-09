const fs = require('fs')
const path = require('path')
const selfsigned = require('selfsigned') // eslint-disable-line

const attrs = [{ name: 'commonName', value: 'localhost' }]

const pems = selfsigned.generate(attrs, {
  algorithm: 'sha256',
  keySize: 2048,
  extensions: [
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 2, // DNS
          value: 'localhost',
        },
      ],
      cA: true,
    },
  ],
})

const updateCerts = () => {
  const configPath = './app/config/config.js'
  const dir = path
    .resolve(__dirname)
    .replace(/\\/g, `/`)
    .replace('C:', '')

  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err) // eslint-disable-line
    }

    const vals = `key: '${dir}/ssl/server.key',
  cert: '${dir}/ssl/server.crt',`
    const result = data.replace(/(key:.+',)\n +(cert:.+)/g, vals)

    // eslint-disable-next-line
    fs.writeFile(configPath, result, 'utf8', (err) => (err ? console.log(err) : false))
  })
}

const sslgen = () => {
  if (fs.existsSync('./ssl')) {
    return
  }

  fs.mkdirSync('./ssl')
  fs.writeFileSync('./ssl/server.crt', pems.cert, { encoding: 'utf-8' })
  fs.writeFileSync('./ssl/server.key', pems.private, { encoding: 'utf-8' })

  updateCerts()
}

module.exports = sslgen()
