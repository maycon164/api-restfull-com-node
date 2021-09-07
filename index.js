const express = require('express');
const consign = require('consign');

let app = express();

consign({
    verbose: true,
    locale: 'pt-br'
}).include('routes').into(app)

app.listen(8080, '127.0.0.1', () => {
    console.log("SERVIDOR RODANDO.....")
});

