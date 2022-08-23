
const User = require('../models/User');


module.exports.getMe = async (nationalcode, req,res) => {
  let user = await findUserByNationalcode(nationalcode);
  if (!user) {
    return false;
  }
  return res.send(user);
}

const findUserByNationalcode = async (nationalcode) => {
    const user = await User.findOne({
      nationalcode,
    });
    if (!user) {
      return false;
    }
    return user;
  };