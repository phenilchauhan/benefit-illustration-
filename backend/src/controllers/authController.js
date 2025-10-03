const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function register(req, res) {
  const { email, password, name, dob, phone } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(400).json({ error: 'email exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const u = User.build({ email, passwordHash });
  u.setSensitive({ name, dob, phone });
  await u.save();
  res.json({ ok: true });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const u = await User.findOne({ where: { email } });
  if (!u) return res.status(401).json({ error: 'invalid' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid' });
  const token = jwt.sign({ userId: u.id, email: u.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '6h' });
  res.json({ token });
}

module.exports = { register, login };
