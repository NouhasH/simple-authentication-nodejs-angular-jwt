module.exports = (sequelize,Sequelize) => {
    
    const Role = sequelize.define("roles",{
        name: {
            type: Sequelize.STRING
        }, 
        status: {
            type: Sequelize.STRING
        }  
    });
    
    return Role;
    
}; 
