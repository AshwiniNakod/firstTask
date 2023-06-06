import bcrypt from "bcryptjs";
import { User } from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Otp } from "../model/otpSchema.js";
import otpGenerator from "otp-generator";
import randomstring from "randomstring";

async function genHashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export let otpgenerator = () => {
  let otp_gen = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  // console.log(otp)
  return otp_gen;
};
export async function sendEmail(req, res) {
  try {
    const { email, password } = req.body;
    const isUserInDb = await User.findOne({ email: email });
    // console.log(isUserInDb)
    if (isUserInDb) {
      res.send({ message: "user already exist" });
    } else {
      const hashedPassword = await genHashedPassword(password);
      // console.log(hashedPassword,password)
      const user = new User({ email, password: hashedPassword });
      await user.save();
      await res.send({
        message: `User was registered successfully! Please check your email and OTP send to your email ${req.body.email}`,
      });
      await sendingMail(email);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function sendingMail(email) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "terrance.pollich@ethereal.email", // generated ethereal user
        pass: "bgygFPhFtjV1C5nhg8", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let gen_otp = otpgenerator();
    let info = await transporter.sendMail({
      from: " <nakodashwini@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "OTP verification", // Subject line
      //   text: `Your OTP : ${otpgenerator()}`, // plain text body
      html: `<p style="font-size:20px">Your OTP: ${gen_otp}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    const otp = new Otp({ otp: gen_otp, email: email });
    await otp.save();
  } catch (error) {
    console.log(error);
  }
}

export const verifyUser = async (req, res) => {
  let data = req.body;
  let { email, password } = data;
  const userInDb = await User.findOne({ email: email });

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

//verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Otp.findOne({ email });
    const findUser = await User.findOne({ email });
    // console.log(findUser)
    if (findUser.verify) {
      return res.send({ message: "Already verified" });
    }
    if (!user) {
      res.send({ message: "Invalid user or OTP" });
    } else {
      if (otp === user.otp) {
        await User.updateOne({ email }, { $set: { verify: true } });
        res.send({ message: "Otp is validate successfull." });
      } else {
        res.send({ message: "Enter correct Otp!" });
      }
    }
  } catch (error) {
    // console.log(error)
    res.status(500).send(error);
  }
  // res.send(user);
};

//resend otp

export const reSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const isUserInDb = await User.findOne({ email: email });
    if (isUserInDb) {
      sendingMail(email);
      res.send({ message: "otp is sent" });
    } else {
      return res.send({ message: "Enter valid email " });
    }
  } catch (error) {
    // console.log(error)
    return res.status(500).send({ message: error.message });
  }
};

//Change password

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const findUser = await User.findOne({ email });
    // console.log(findUser.password,newPassword)
    if (!findUser) {
      res.send({ message: "User not found or Enter correct email" });
    } else {
      let comparewithOldPassword = bcrypt.compareSync(
        newPassword,
        findUser.password
      ); // true
      if (comparewithOldPassword) {
        //old and new password same
        res.status(201).send({ message: "choose another password" });
      } else {
        let newHashPassword = await genHashedPassword(newPassword);
        let result = await User.updateOne(
          { email: email },
          { $set: { password: newHashPassword } }
        );
        res.send({ result: result, message: "Password changed" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const sendResetPasswordMail = async (email, randomstring) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "terrance.pollich@ethereal.email", // generated ethereal user
        pass: "bgygFPhFtjV1C5nhg8", // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "<foo@example.com>", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      //   text: `Your OTP : ${otpgenerator()}`, // plain text body
      // html: `<p>Copy the link <a href="http://localhost:3000/user/resetPassword?token=${randomstring}">and Reset Password</a> </p>`, // html body
      html: `<p>Copy the string ${randomstring} and Reset Password </p>`, // html body
      
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      //  console.log(randomstring.generate());
      let randomString = randomstring.generate();

      const result = await User.updateOne(
        { email: email },
        { $set: { randomString: randomString } }
      );
      await sendResetPasswordMail(email, randomString);
      res.status(200).send({ message: "Please check your mail box" });
    } else {
      res.status(200).send({ message: "User not exits" });
    }
    // res.send("forgetPassword")
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    // const token = req.query.token;
    const {password} = req.body;
    let user = await User.findOne({ randomString: req.query.randomString });
    // console.log(user)
    if (user) {
      let hashPassword = await genHashedPassword(password);
      // console.log(hashPassword)
      let result = await User.updateOne({email: user.email },{ $set: { password: hashPassword, randomString:""}});
      res.status(200).send({ message: "Password has been reset", result: result });
    } else {
      res.status(200).send({ message: "Wrong String" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error.message });
    
  }

     
};

