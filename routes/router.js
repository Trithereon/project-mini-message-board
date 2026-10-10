const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller");

router.get("/", controller.messagesGet);
router.get("/new", controller.newGet);
router.post("/new", controller.newPost);
router.get("/delete", controller.deleteGet);
router.all("{*splat}", (req, res) => {
  console.log("404 triggered by:", req.method, req.originalUrl);
  res.status(404).render("404");
});

module.exports = router;
