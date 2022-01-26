const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.use(bodyParser.json());
server.use(cors());

const port = process.env.Port || 1337;
const fs = require('fs')

console.log(__dirname + '/../node_modules');

server.use(express.static(__dirname + '/../'))
server.use(express.static(__dirname + '/../src'))
server.use(express.static(__dirname + '/../node_modules'))

server.get('/', (req,res)=> {
	res.send('I hear you, sir.')
});

server.get('*', (req, res)=> {
	res.sendFile(path.resolve(__dirname, '../index.html'));
})

server.listen(port, () => {
	console.log(`server listening at http://localhost:${port}`);
})