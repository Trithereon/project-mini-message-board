const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters and numbers.";
const lengthErr = "must be between 1 and 255 characters long.";
const userLengthErr = "must be between 1 and 20 characters long.";
const emptyErr = "must not be empty.";

const validateMessage = [
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage(`Message ${emptyErr}`)
    .isAlphanumeric()
    .withMessage(`Message ${alphaErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Message ${lengthErr}`),
  body("messageUser")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .isAlphanumeric()
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${userLengthErr}`),
];

exports.messagesGet = async (req, res) => {
  return res.render("index", {
    title: "Mini Messageboard",
    messages: await db.getAllMessages(),
  });
};

exports.newGet = (req, res) => {
  return res.render("form", { title: "New Message" });
};

exports.newPost = [
  validateMessage,
  async (req, res) => {
    // Server-side validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("form", { title: "New Message", errors: errors.array() });
    }

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
  },
];

exports.deleteGet = async (req, res) => {
  await db.deleteAllMessages();
  return res.redirect("/");
};
