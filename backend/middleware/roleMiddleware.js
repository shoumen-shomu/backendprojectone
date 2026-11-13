const jwt = require("jsonwebtoken");

const unauthorized = (res, message = "You are not Authorized") =>
  res.status(401).json({ success: false, message });

const getDecodedToken = (req, res) => {
  const authorization = req.headers.authorization;
  if (typeof authorization !== "string") {
    unauthorized(res, "You are not Loggedin");
    return null;
  }

  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    unauthorized(res, "You are not Loggedin");
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_VERIFY_SECRET);
  } catch {
    unauthorized(res, "You are not Loggedin");
    return null;
  }
};

const adminmiddleware = (req, res, next) => {
  const decoded = getDecodedToken(req, res);
  if (!decoded) return;
  if (decoded.role !== "admin") return unauthorized(res);
  next();
};

const vendormiddleware = (req, res, next) => {
  const decoded = getDecodedToken(req, res);
  if (!decoded) return;
  if (decoded.role !== "vendor" && decoded.role !== "admin") return unauthorized(res);
  next();
};

const usermiddleware = (req, res, next) => {
  const decoded = getDecodedToken(req, res);
  if (!decoded) return;
  req.user = decoded;
  next();
};

module.exports = { adminmiddleware, vendormiddleware, usermiddleware };
