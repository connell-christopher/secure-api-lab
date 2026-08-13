const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const SECRET = "lab-secret-key";

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
 * INTENTIONALLY VULNERABLE LAB
 *
 * This implementation demonstrates an unsafe JWT
 * validation pattern for educational purposes.
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
      sub: user.id,
      username: user.username,
      role: user.role
    },
    SECRET
  );

  res.json({ token });
});

app.get("/api/profile", (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "Authorization required"
    });
  }

  const token = authorization.replace("Bearer ", "");

  /*
   * VULNERABILITY:
   *
   * The token is decoded without cryptographically
   * verifying its signature.
   *
   * Decoding ≠ verification.
   */

  const decoded = jwt.decode(token);

  if (!decoded) {
    return res.status(401).json({
      error: "Invalid token"
    });
  }

  res.json({
    message: "Authenticated request",
    user: decoded
  });
});

app.listen(3002, () => {
  console.log("Vulnerable JWT API running on port 3002");
});
