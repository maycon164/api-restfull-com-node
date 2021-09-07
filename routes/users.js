
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

app.get('/users/admin', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    res.json({
        usersAdmin: []
    })
})


}