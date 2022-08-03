import * as express from "express";
import login from "./login";
import register from "./register";
import { isValidToken } from "../../utilities/tokenCheck";

const router = express.Router();
//current path is /auth

router.use("/login", login);
router.use("/register", register);
router.get("/verify", isValidToken, (req, res) => {
  res.json({ msg: "good job, way to go!" });
});

export default router;
