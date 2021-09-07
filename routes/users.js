const NeDB = require('nedb');

let db = new NeDB({
    filename : 'users.db',
    autoload : true
});

module.exports = (app) => {
        
    app.get('/users', (req, res) => {
      
        res.status(200).json(db.getAllData());
        
    });

    //buscaPeloNome
    app.get('/users/:name', (req, res) => {

        //BUSCA SIMPLES retorna o primeiro set q encontrar
        //db.find({$where: doc => doc.name.includes(req.params.name)}, (error, docs) 
        let regex = new RegExp(req.params.name);

        db.find({name: regex}, (error, docs) => {
            
            if(error) {
                
                res.status(400).json(error);
            }
            
            else{

                console.log(docs);
                res.status(200).json(docs);
            } 
        })

        //res.end(`<p> Name: ${req.params.name}</p>`)
    });

    // inserindo registro

    app.post('/users', (req, res) => {
        
        db.insert(req.body, (error, doc) => {
            
            if(error){
                console.log(`Error: ${error}`);
                res.status(400).json({
                    error
                });
            }else{
                res.status(200).json(doc);
            }

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