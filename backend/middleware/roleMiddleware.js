const jwt = require("jsonwebtoken");

let adminmiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded.role != "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not Authorized",
    });
  } else {
    next();
  }

};

let vendormiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded.role != "vendor" && decoded.role != "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not Authorized",
    }); 
  } else{
    next()
  }

  

};
let usermiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded) {
    return res.status(401).json({
      success: false,
      message: "You are not Loggedin",
    }); 
  } else{
    next()
  }

  

};

module.exports = {adminmiddleware,vendormiddleware,usermiddleware};
