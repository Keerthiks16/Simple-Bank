import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "banking-secret";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ Error: "You are not authenticated" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ Error: "Token is not valid" });
    }

    req.user = decoded;
    next();
  });
};

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
