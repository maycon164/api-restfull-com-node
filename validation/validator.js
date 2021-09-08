module.exports = {
    validate: function(user) {
        let errors = [];
        
        if(!user.name){
            errors.push("name doesnt exist");

        }

        if(!user.email){
            errors.push("email doesnt exist");

        }

        if(!user.password){
            errors.push("password doesnt exist");

        }

        if(errors.length > 0) return errors;
    }
}