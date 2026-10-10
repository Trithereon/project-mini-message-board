const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

exports.messagesGet = async (req, res) => {
  return res.render("index", {
    title: "Mini Messageboard",
    messages: await db.getAllMessages(),
  });
};

exports.newGet = (req, res) => {
  return res.render("form", { title: "New Message" });
};

exports.newPost = async (req, res) => {
  const { messageUser, messageText } = req.body;
  if (!messageUser || !messageText)
    return res.status(400).render("messageSent", {
      title: "Error 400",
      body: "Error 400 Bad Request - invalid message input",
    });
  await db.insertMessage({ text: messageText, username: messageUser });
  return res.render("messageSent", {
    title: "Message Sent",
    body: "Successfully submitted.",
  });
};

exports.deleteGet = async (req, res) => {
  await db.deleteAllMessages();
  return res.redirect("/");
};
