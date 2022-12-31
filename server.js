const http = require('http');
const fs = require('fs');
const app = require('./app');

// var data = fs.readFileSync('./src/patients.json');
// var words = JSON.parse(data);
// console.log(words);

const port = process.env.PORT || 3000;
const ip = 'localhost';

const server = http.createServer(app);

server.listen(port, ip, () => {
    console.log(`The server is listening on ${ip}:${port}.`);
});