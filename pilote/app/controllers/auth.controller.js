const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req,res) =>{
    
    User.create({
        username: req.body.username,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    })
    .then(user=>{
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles=> {
                user.setRoles(roles).then(()=>{
                    res.send({message: "user was registrated succcc"});
                })
            })
        }else{
            user.setRoles([1]).then(()=>{
                res.send({message: "user was registrated succcc"});
            });
        }
    }).catch(err=>{
        res.status(500).send({message:err.message});
    })
};

exports.signin = (req,res)=>{

    User.findOne({

        where: {
            username : req.body.username
        }
    }).then(user=>{
        if(!user){
            return Response.status(404).send({message:"user not found"});
        }
        var isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!isPasswordValid){
            return res.status(401).send({
                message : "Invalid password"
            });

        }

        var token = jwt.sign({id:user.id}, config.secret,{
            expiresIn:60000
        });

        var authorities = [];

        user.getRoles().then(roles=>{

            for(let i=0; i<roles.length;i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id:user.id,
                username:user.username,
                email:user.email,
                roles:authorities,
                accessToken:token
            });
        });
    }).catch(err=>{
        res.status(500).send({message:err.message});
    })
}
