import { IAuthors, NewAuthor } from "../../types";
import { query } from "../index";

const getAllAuthors = () => query<IAuthors[]>("SELECT * FROM Authors", []);
const getOneAuthor = (id: number) => query<IAuthors[]>("SELECT * FROM Authors WHERE id = ?", [id]);
const getOneAuthorByEmail = (email: string) => query<IAuthors[]>("SELECT * FROM Authors WHERE email = ?", [email]);
const createNewAuthor = (newAuthor: NewAuthor) => query("INSERT INTO Authors SET ?", [newAuthor]);
//does not need a create, update, or destroy query

export default {
  getAllAuthors,
  getOneAuthor,
  getOneAuthorByEmail,
  createNewAuthor,
};
