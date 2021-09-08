const express = require('express');
const consign = require('consign');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

consign({
    verbose: true,
    locale: 'pt-br'
}).include('routes').include('utils').include('validation').into(app)

app.listen(8080, '127.0.0.1', () => {
    console.log("SERVIDOR RODANDO.....")
});