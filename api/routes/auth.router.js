import express from "express";
import signup from "../controllers/authControllers/signup.js";
import login from "../controllers/authControllers/login.js";
import refresh from "../controllers/authControllers/refresh.js";
import logout from "../controllers/authControllers/logout.js";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
