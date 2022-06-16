import { IAuthors } from "../../types";
import { query } from "../index";

const getAllAuthors = () => query<IAuthors[]>("SELECT * FROM Authors", []);
const getOneAuthor = (id: number) => query<IAuthors[]>("SELECT * FROM Authors WHERE id = ?", [id]);
//does not need a create, update, or destroy query

export default {
  getAllAuthors,
  getOneAuthor,
};
