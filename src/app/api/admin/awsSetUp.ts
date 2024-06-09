require("dotenv").config();

const AWS = require("aws-sdk");

// Set AWS credentials explicitly
AWS.config.update({
  accessKeyId: process.env.AWS_KEYID,
  secretAccessKey: process.env.AWS_SECRET,
  region: "eu-north-1",
});

module.exports = AWS;
