import * as express from "express";
import * as bcrypt from "bcrypt";
import AuthorQuery from "../../database/queries/Authors";
import pizza from "../../utilities/token";

const router = express.Router();

//current path is /auth/register
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "Please enter the correct info. Fool!" });

  try {
    const hashedPass = bcrypt.hashSync(password, 12);
    const createUser = await AuthorQuery.createNewAuthor({ name, email, password: hashedPass });
    const token = pizza.signToken({ email, id: createUser.insertId });
    return res.status(200).json({ msg: "User created successfully", id: createUser.insertId, token });
  } catch (error) {
    return res.status(500).json({ msg: "Andrew broke this query. It's not my fault." });
  }
});

export default router;
