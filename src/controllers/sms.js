const _ = require("lodash");
const { sendSmsAsanak } = require("../services/sms");

const sms = async (req, res, next) => {
  const { receptors, messages } = req.body;

  receptors.map((receptor, index) => {
    sendSmsAsanak(receptor, messages[index]);
  });

  res.send({ ok: true });
};

module.exports = {
  sms,
};
