
module.exports = (app) => {
        
    app.get('/users', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            name: "Maycon",
            idade: "20",
            sexo: "Masculino"
        })
    });

    app.post('/users', (req, res) => {
        console.log("Metodo post: ", req.body);
        res.json(req.body);
    });

    app.get('/users/admin', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        res.json({
            usersAdmin: []
        })
    })


}