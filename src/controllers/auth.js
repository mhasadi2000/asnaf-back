// const { encrypt, compare } = require('../services/crypto');
const { generateOTP } = require('../services/OTP');
// const { sendMail } = require('../services/MAIL');
const User = require('../models/User');
const {sendSmsAsanak} =require('../services/sms');
const {signToken} =require('../services/jwt');

module.exports.signUpUser = async (req, res) => {
  const { mobile, nationalcode } = req.body;
  let user = await findUserByNationalcode(nationalcode);
  if (!user) {
    user = await createUser(mobile,nationalcode);
  }

  try {
    let otpGenerated = generateOTP();
    await updateUser(nationalcode, otpGenerated)
    await sendSmsAsanak(mobile, otpGenerated);

    return res.send({ok: true});
  } catch (error) {
    res.status(500)
    return res.send({ok: false, message: "Cannot generate otp"});
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { nationalcode, otp } = req.body;
  console.log(nationalcode, otp);
  const user = await validateUserSignUp(nationalcode, otp);

  if(user) {
    res.send({
      user: {nationalcode},
      access_token: signToken({nationalcode})
    });
  }
};

const findUserByNationalcode = async (nationalcode) => {
  const user = await User.findOne({
    nationalcode,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (mobile, nationalcode) => {
//   const hashedPassword = await encrypt(password);
  const newUser = await User.create({
    mobile,
    nationalcode
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }

  return newUser;
};

const updateUser = async (nationalcode, otp) => {
//   const hashedPassword = await encrypt(password);
  const user = await User.update({
    nationalcode,
    otp,
  });
  if (!user) {
    return [false, 'Unable to generate otp'];
  }

  return user;
};

const validateUserSignUp = async (nationalcode, otp) => {
  const user = await User.findOne({
    nationalcode
  });
  if (!user) {
    return false;
  }
  if (user && user.otp !== otp) {
    return false;
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { otp: null },
  });
  return updatedUser;
};