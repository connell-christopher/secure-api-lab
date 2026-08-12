const express = require("express");

const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    username: "alice",
    email: "alice@example.test",
    role: "user"
  },
  {
    id: 2,
    username: "bob",
    email: "bob@example.test",
    role: "user"
  }
];

/*
 * SECURE BOLA LAB
 *
 * Authentication is simulated using the X-User-ID header.
 * The important control demonstrated here is
 * server-side object-level authorization.
 */

function authenticate(req, res, next) {
  const userId = Number(req.header("X-User-ID"));

  const user = users.find(
    (user) => user.id === userId
  );

  if (!user) {
    return res.status(401).json({
      error: "Authentication required"
    });
  }

  req.user = user;

  next();
}

app.get("/api/users/:id", authenticate, (req, res) => {
  const requestedUserId = Number(req.params.id);

  const user = users.find(
    (user) => user.id === requestedUserId
  );

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  /*
   * OBJECT-LEVEL AUTHORIZATION
   *
   * The authenticated user must be authorized
   * to access the requested object.
   */

  if (req.user.id !== user.id) {
    return res.status(403).json({
      error: "Forbidden"
    });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Secure BOLA API running on port ${PORT}`);
});
