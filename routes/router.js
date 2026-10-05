const { Router } = require("express");
const router = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Azamat",
    added: new Date(),
  },
  {
    text: "I am honored to be here!",
    user: "George",
    added: new Date(),
  },
  {
    text: "Where can I get some cat pics?",
    user: "Edward",
    added: new Date(),
  },
  {
    text: "Edward is a pig. What's up Eddie",
    user: "Brad",
    added: new Date(),
  },
];

router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  if (!messageUser || !messageText)
    return res.status(400).render("messageSent", {
      title: "Error 400",
      body: "Error 400 Bad Request - invalid message input",
    });
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.render("messageSent", {
    title: "Message Sent",
    body: "Successfully submitted.",
  });
});

router.all("{*splat}", (req, res) => {
  console.log("404 triggered by:", req.method, req.originalUrl);
  res.status(404).render("404");
});

module.exports = router;
