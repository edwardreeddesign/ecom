import User from '../../../models/User';
import db from '../../../utils/db';
import bcryptjs from 'bcryptjs';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { firstName, lastName, name, email, password } = req.body;
  if (
    !name ||
    !firstName ||
    !lastName ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({ message: 'Validation Error' });
    return;
  }

  await db.connect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User already exists' });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    firstName,
    lastName,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
