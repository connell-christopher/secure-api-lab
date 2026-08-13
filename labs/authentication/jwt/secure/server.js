const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret";

const users = [
  {
    id: 1,
    username: "alice",
    role: "user"
  },
  {
    id: 2,
    username: "admin",
    role: "admin"
  }
];

/*
 * SECURE JWT LAB
 *
 * This implementation demonstrates explicit JWT
 * signature and claim validation.
 */

app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = users.find(
    (user) => user.username === username
  );

  if (!user) {
    return res.status(401).json({
      error: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    {
      sub: String(user.id),
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "15m",
      issuer: "bola-jwt-lab",
      audience: "api-security-lab"
    }
  );

  res.json({ token });
});


function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Bearer token required"
    });
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: "bola-jwt-lab",
      audience: "api-security-lab"
    });

    if (!decoded.sub || !decoded.username || !decoded.role) {
      return res.status(401).json({
        error: "Required claims missing"
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token"
    });
  }
}


app.get("/api/profile", authenticate, (req, res) => {
  res.json({
    message: "Authenticated request",
    user: {
      id: req.user.sub,
      username: req.user.username,
      role: req.user.role
    }
  });
});


app.listen(3003, () => {
  console.log("Secure JWT API running on port 3003");
});
