const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "dev@brandonolin.com",
      subject: "Thanks for joining",
      text: `Welcome to this app, ${name}. Let me know how you go alone with this app`,
    })
    .catch((e) => {
      console.log("Status: ERROR", e);
    });
};

const sendFarewellEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "dev@brandonolin.com",
      subject: "Sorry to see you go!",
      text: `At your request we're cancelling your account ${name}. If you don't mind, could you send us a quick email back explaining why you're going? We'd love to know what we can do to improve our service for other users!`,
    })
    .then((data) => {
      // console.log("Status: SUCCESS", data);
    })
    .catch((e) => {
      // console.log("Status: ERROR", e);
    });
};

module.exports = { sendWelcomeEmail, sendFarewellEmail };
