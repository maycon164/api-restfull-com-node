const NeDB = require('nedb');

let db = new NeDB({
    filename : 'users.db',
    autoload : true
});

module.exports = (app) => {
    
    //Listar todos os users
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

    //buscaPeloNome ou pelo _id
    app.get('/users/:key', (req, res) => {

        //BUSCA pode ser pelo id do user ou pelo name;
        let regex = new RegExp(req.params.key);

        db.find({$or: [{_id: req.params.key}, {name: regex}]}, (error, docs) => {
            
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

    //Deletando um registro
    app.delete('/users/:id', (req, res) => {

        let id = req.params.id;

        //Remove apenas com o id
        db.remove({_id : id}, {multi : false}, (error, numRemoved) => {
            
            if(error){
                
                app.utils.error.send(error, req, res);

            }else{
                res.status(200).end(`<p> ${numRemoved} item foi removido <p>`);
            }

        });
    })

    //Atualizando um user
    app.put('/users/:id', (req, res) => {
        
        let id = req.params.id;

        db.findOne({_id : id}, (error, doc) => {
           
            if(error){
            
                app.utils.error.send(error, req, res);
            
            }else{
            
                let obj = Object.assign(doc, req.body);
                delete obj._id;
                console.log(obj);
                db.update({_id : id}, obj, (error, numberUpdates) => {
                    app.utils.error.send(error, req, res);
                    res.status(200).end(`<p>${numberUpdates} itens alterados</p>`)
                });  

            }
        });
    
    });

    //USUARIOS -> admins?
    app.get('/users/admin', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        res.json({
            usersAdmin: []
        })
    })


}