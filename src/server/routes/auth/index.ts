import * as express from "express";
import login from "./login";
import register from "./register";

const router = express.Router();
//current path is /auth

router.use("/login", login);
router.use("/register", register);

export default router;
