/*
'use strict'
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain') //texto plano
  res.end('Hola Mundo\n')
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`)
});
*/
'use strict'
const http = require('http')

function webServer(req,res)
{
	res.writeHead(200,{'Content-Type':'text/html'})
	res.end('<h1>Hola Node.js</h1>')
}

http
    .createServer(webServer)
    .listen(3000,'localhost')

console.log('Servidor corriendo en http://localhost:3000/')