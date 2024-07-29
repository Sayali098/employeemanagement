
import User from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";



export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  

  const newUser = new User({
    username,
    email,
    password
    
  });

  try {
    await newUser.save();
    
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    
    res.status(201).json({ message: "User created successfully", token, username: newUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signin=async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: '1h' });
      return res.json({ token, username: user.username });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}