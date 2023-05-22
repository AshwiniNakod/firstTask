import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { createUsers, getUserByEmail } from "./dbQuery.js";

let otpgerator = () => {
  let otp_gen = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  // console.log(otp)
  return otp_gen;
};
let OTP = otpgerator();

async function sendingMail() {
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
    from: '"Fred Foo 👻" <nakodashwini@gmail.com>', // sender address
    to: "bar@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Your OTP : ${OTP}`, // plain text body
    html: `<p>Your OTP: ${OTP}</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
export async function sendEmail(req, res) {
  const { email, password } = req.body;

  const isUserInDb = await getUserByEmail(email);
  // console.log(isUserInDb)
  if (isUserInDb) {
    res.status(400).send({ message: "user already exists" });
  } else {
    const result = await createUsers({
      email: email,
      password: password,
    });
    // res.send(result)
    await res.send({
      message:
        "User was registered successfully! Please check your email and OTP send to your mail " +
        `${req.body.email}`,
      result: result,
    });
    await sendingMail();
  }
}

// sendEmail().catch(console.error);


export let otp = OTP;
