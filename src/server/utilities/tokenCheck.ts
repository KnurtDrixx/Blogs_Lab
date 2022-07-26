import * as express from "express";
import tokenUtils from "./token";

export const isValidToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Wrongs Beans In'nit?" });
    return;
  }

  const [type, token] = req.headers.authorization.split(" ");

  if (type !== "Bearer") {
    res.status(401).json({ message: "Wrong Authentication Scheme Gov?" });
    return;
  }

  try {
    const tokenHolder = tokenUtils.verifyToken(token);
    req.payload = tokenHolder;
    next();
  } catch (error) {
    res.status(401).json({ message: "This Token is Garbage" });
  }
};
