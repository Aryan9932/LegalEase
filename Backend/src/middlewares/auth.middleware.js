
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
}

export function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Access forbidden: insufficient rights." });
    }
    next();
  };
}
