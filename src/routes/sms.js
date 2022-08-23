const express = require("express");

const { sms } = require("../controllers/sms");

const router = express.Router();

router.get("", sms);

module.exports = router;
