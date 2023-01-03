import * as bcrypt from "bcrypt";

const createPassword = (password: string) => {
  const hashed = bcrypt.hashSync(password, 12);
  return hashed;
};

const comparePassword = (password: string, hashedPassword: string) => {
  const doesMatch = bcrypt.compareSync(password, hashedPassword);
  return doesMatch;
};

export default { createPassword, comparePassword };
