import jwt from "jsonwebtoken";
import { getUserByEmail } from "../controller/dbQuery.js";

const verifyUser = async (req, res) => {
  let data = req.body;
  let { email, password } = data;
  // console.log(email,password)

  const userInDb = await getUserByEmail(email);
//   console.log(userInDb);
  if (!userInDb) {
    res.status(401).send({ message: "Invalid Credentials !" });
  } else {
//     console.log(userInDb.password);
    if (password === userInDb.password) {
      const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {expiresIn: "5min"});
      res.send({ message: "successfully Login", token: token });
    } else {
      res.status(401).send({ message: "Invalid Credentials !" });
    }
  }

};

const verify_otp = () => {};

export const verifyUsers = verifyUser;
