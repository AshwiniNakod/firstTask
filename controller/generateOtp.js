import otpGenerator from "otp-generator";

export let otpgenerator = () => {
    let otp_gen = otpGenerator.generate(5, {upperCaseAlphabets: false,specialChars: false,});
    // console.log(otp)
    return otp_gen;
  };
//   let OTP = otpgerator();
  