const express = require("express");
const router = express.Router();
const UserSchema = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const decodeToken = require("../middlewares/decodeToken");
const JWT = require("jsonwebtoken");

const JWT_SECRET_KEY = "daagijf4iygnv8ya2azcvzb";

//create a new user using POST method. Login not required
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    let user = await UserSchema.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("Email already registered");
    }
    const { name, email, password } = req.body;
    user = await UserSchema.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, await bcrypt.genSalt(10)),
    });
    user.save();
    res.send(user);
  }
);
//login a user using POST method. Login not required
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors });
    }
    const { email, password } = req.body;
    let user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(401).send("Please enter correct login credentials");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).send("Please enter correct login credentials");
    }
    // generating auth Token for this user
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = JWT.sign(data, JWT_SECRET_KEY);

    res.json({
      message: "Login Successfull",
      user: req.body,
      AuthToken: authToken,
    });
  }
);

//fetch a user by tokenID using POST methon. Login required
router.post('/fetchUser',decodeToken,async(req,res)=>{
  const userId = req.user.id;
  console.log(userId)
  let user = await UserSchema.findById(userId).select('-password');
  if(!user) {
    return res.status(401).send("Unauthorized access is not allowed");
  }
  res.json({user});
})
module.exports = router;
