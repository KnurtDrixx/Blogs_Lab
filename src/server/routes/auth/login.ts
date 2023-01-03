import * as express from "express";
import tokenMaker from "../../utilities/token";
import passwordUtilis from "../../utilities/passwords";
import Authors from "../../database/queries/Authors";

const router = express.Router();

const checkCredentials = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: "Invalid credentials, please try again." });
    return;
  }
  //checks to see if email and password are given

  try {
    const [user] = await Authors.getOneAuthorByEmail(req.body.email);

    if (!user) {
      res.status(401).json({ message: "Invalid credentials, please try again." });
      return;
    }
    //checks to see if email exists in database

    const passwordMatch = passwordUtilis.comparePassword(req.body.password, user.password!);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials, please try again." });
      return;
    }
    //checks to see if password matches in database

    //at this point the user has the correct email and password and is who they say they are.

    delete user.password;
    //security to keep password hidden, not 100% necessary becasue making req.payload object be email and id. but is good practice.

    req.payload = { email: user.email, id: user.id };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials, please try again." });
    return;
  }
};

//current path is /auth/login
router.post("/", checkCredentials, (req, res) => {
  const token = tokenMaker.signToken(req.payload);
  res.json({ token });
});

export default router;
