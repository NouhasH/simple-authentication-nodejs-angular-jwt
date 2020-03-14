exports.allAccess = (req,res)=>{
    res.status(200).send("public content");
}

exports.adminResource = (req,res)=>{
    res.status(200).send("admin content");
}

exports.userResource = (req,res)=>{
    res.status(200).send("user content");
}