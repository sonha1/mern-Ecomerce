import _User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await _User.findOne({ email: email });
    console.log;
    if (!user) {
      return res.status(401).json({ message: "email or password not correct" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "password is incorrect" });
    }
    const accessToken = jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.SECRET_ACCESS_KEY,
      {
        expiresIn: "20m",
      }
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 12 * 60 * 1000),
      })
      .json({ accessToken, user });
  } catch (error) {
    console.error(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await _User.findOne({ email: email });
    if (user) {
      return res.status(401).json({ message: "user already exist" });
    }
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new _User({
      email: email,
      password: password,
      name: name,
    });
    newUser.save();
    // const { pass: password, ...others } = newUser._doc;
    return res.status(200).json({ message: "register success", user: newUser });
  } catch (error) {
    console.log(error);
  }
};

// get /api/v1/user/all ---admin---
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await _User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

// get /api/v1/user/:id  ---ALL---
export const profileUser = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const user = await _User.findById(req.params.id);
    res.status(200).json({ ...user._doc });
  } catch (error) {
    console.error(error);
  }
};
//  put /api/v1/user/update ---all---

export const updateUser = async (req, res, next) => {
  try {
    const user = await _User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
    });
    res.status(200).json({ message: "update Success", ...user });
  } catch (error) {
    console.error(error);
  }
};
// delete  /api/v1/user/delete/:id     ---admin--- lock user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await _User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "delete success", ...user });
  } catch (error) {
    console.error(error);
  }
};
