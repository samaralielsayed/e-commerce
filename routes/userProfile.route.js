const express = require("express");
const router = express.Router();

const controllers = require("../controllers/userProfile.controller");
const { auth } = require("../middleware/auth");
//const { isAdmin } = require("../middleware/admin");

router.get("/", auth, controllers.getCurrentUserProfile);
router.patch("/", auth,controllers.updateCurrentUserProfile);

module.exports = router;