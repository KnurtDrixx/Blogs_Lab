import { ITags } from "../../types";
import { query } from "../index";

const getAllTags = () => query<ITags[]>("SELECT * FROM Tags", []);
const getOneTag = (id: number) => query<ITags[]>("SELECT * FROM Tags WHERE id = ?", [id]);

export default {
  getAllTags,
  getOneTag,
};
