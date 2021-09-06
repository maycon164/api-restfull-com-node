console.log("Olá Mundo");

const http = require('http');

let server = http.createServer((req, res) => {
    console.log('Req URL', req.url);
    console.log('Req METHOD', req.method);
    res.end('OK...');
});

server.listen(8080, '127.0.0.1', () => {
    console.log("SERVIDOR RODANDO.....")
});