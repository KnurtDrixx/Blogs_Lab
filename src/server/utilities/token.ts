import * as jwt from "jsonwebtoken";
import { Payload } from "../types";
import { JWTConfig } from "../config";

const signToken = (payload: Payload) => {
  const token = jwt.sign(payload, JWTConfig.secret, { expiresIn: "15d" });
  return token;
};

const verifyToken = (token: string) => {
  const payload = jwt.verify(token, JWTConfig.secret) as Payload;
  return payload;
};

export default { signToken, verifyToken };
