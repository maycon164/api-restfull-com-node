const express = require('express');
let routes = express.Router();


routes.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        name: "Maycon",
        idade: "20",
        sexo: "Masculino"
    })
});

routes.get('/admin', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    res.json({
        usersAdmin: []
    })
})

module.exports = routes;
