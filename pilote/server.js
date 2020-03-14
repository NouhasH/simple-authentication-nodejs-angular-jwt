const express =  require("express");
const bodyparser =  require("body-parser");
const cors = require("cors");


const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
  };
  
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


const db = require ("./app/models");
const Role = db.role;

/// mode prod
//db.sequelize.sync();


/// mode dev
// db.sequelize.sync({force : true}).then(()=>{
//     console.log("Drop tables");
//     init();
// })

// function init(){
//     Role.create(
//         {
//             name:"User",
//             status: "active"
//         }
//     );
//     Role.create(
//         {
//             name:"moderator",
//             status: "active"
//         }
//     );
//     Role.create(
//         {
//             name:"admin",
//             status: "active"
//         }
//     );

// }


//routes
require("./app/routes/auth.route")(app);
require("./app/routes/user.route")(app);


const PORT = 8080;
app.listen(PORT,()=>{
    console.log('our server is running' );
});

