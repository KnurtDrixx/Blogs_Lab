import * as express from "express";

import MailGun from "mailgun.js";
import * as FormData from "form-data";
import * as Mailgun from "mailgun.js";
import { contactConfig } from "../config";

const router = express.Router();
//current path is /api/Contact

router.post("/", async (req, res) => {
  const newEmail = req.body;

  try {
    const result = await mailgun.messages.create(contactConfig.domain, {
      to: contactConfig.email,
      subject: "Test",
      from: "The Pizza King <marketing@yoursite.com>",
      html: "Thank you so much for to look at my Blogs",
    });
    res.json({ message: "Email successfully sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A Contact Error occurred" });
  }
});

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
  username: "api",
  key: contactConfig.key,
});

export default router;
