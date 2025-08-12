const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret123';

// Hardcoded admin credentials
const admin = {
  role: 'admin',
  password: bcrypt.hashSync('zenbug', 8) // hashed password
};

// POST /api/login
router.post("/login", (req, res) => {
  const { role, password } = req.body;

  if (role !== admin.role || !bcrypt.compareSync(password, admin.password)) {
    if (role !== admin.role) {
  return res.status(401).json({ message: 'Role can only be admin.' });
}
    return res.status(401).json({ message: "Invalid password." });
  }


  const token = jwt.sign({ role }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
