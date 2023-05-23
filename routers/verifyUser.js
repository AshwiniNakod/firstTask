import jwt from "jsonwebtoken";
import { User } from "../model/userSchema.js";
import bcrypt from "bcryptjs";

export const verifyUser = async (req, res) => {
  let data = req.body;
  let { email, password } = data;
  const userInDb = await User.findOne({ email: email });
  //   console.log(userInDb);
  if (!userInDb) {
    res.status(401).send({ message: "Invalid Credentials !" });
  } else {
    const storedPassword = userInDb.password;
    const isPasswordMatch = bcrypt.compareSync(password, storedPassword);
    // console.log(isPasswordMatch);
    if (isPasswordMatch) {
      const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: "5min",
      });
      res.send({ message: "successfully Login", token: token });
    } else {
      res.status(401).send({ message: "Invalid Credentials !" });
    }
  }
};


// export const verifyUsers = verifyUser;
