const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
var cors = require('cors')

app.use(cors())

 const port = process.env.PORT || frosty-khorana-ea9ba9.netlify.app;

app.use(express.static(__dirname + '/dist/statisticsofCoronavirus'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
