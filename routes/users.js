const NeDB = require('nedb');

let db = new NeDB({
    filename : 'users.db',
    autoload : true
});

module.exports = (app) => {
    

    app.get('/users',(req, res) => {
      
        //res.status(200).json(db.getAllData());
        
        db.find({}).sort(-1).exec((error, docs) => {
            if(error){
                app.utils.error.send(error, req, res);
            }else{
                res.status(200).json({
                    docs
                })
            }

        })

    });

    //buscaPeloNome
    app.get('/users/:name', (req, res) => {

        //BUSCA SIMPLES retorna o primeiro set q encontrar
        //db.find({$where: doc => doc.name.includes(req.params.name)}, (error, docs) 
        let regex = new RegExp(req.params.name);

        db.find({name: regex}, (error, docs) => {
            
            if(error) {
                
                app.utils.error.send(error, req, res);
            }
            else{
               res.status(200).json(docs);
            } 
        })

        //res.end(`<p> Name: ${req.params.name}</p>`)
    });

    // inserindo registro

    app.post('/users', (req, res) => {
        
        db.insert(req.body, (error, doc) => {
            
            if(error){
                app.utils.error.send(error, req, res);
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