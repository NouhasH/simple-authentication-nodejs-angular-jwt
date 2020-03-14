const db = require ("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicataUsernameOrEmail = (req,res,next) =>{

    //Username
    User.findOne({
         where:{
             username: req.body.username
         }
    }).then(user => {
        if(user) {
            res.status(400).send({
                messsage : "username already exist"
            });
            return;
        }

        //email
        User.findOne({
            where:{
                email: req.body.email
            }
       }).then(user => {
           if(user) {
               res.status(400).send({
                   messsage : "email already exist"
               });
               return;
           }
           next();
       });

    });
};

const verifySignUp = {

    checkDuplicataUsernameOrEmail : checkDuplicataUsernameOrEmail

};
module.exports = verifySignUp;


