
const _ = require("lodash");
const {sendSmsAsanak} = require("../services/sms");


const sms = async (req, res,next) => {

  console.log("in sendAsanak");
  console.log(req);
  const {receptors, messages} = req.body;

  receptors.map((receptor, index) => {
    // console.log("reqqqqqq",req.body);
    sendSmsAsanak(receptor, messages[index])
  })

  return {
    ok: true
  }
};

module.exports = {
  sms
};