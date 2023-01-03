import * as dotenv from "dotenv";
dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

export const contactConfig = {
  domain: process.env.MAILGUN_DOMAIN!,
  key: process.env.MAILGUN_KEY!,
  email: process.env.MAILGUN_EMAIL!,
};

export const JWTConfig = {
  secret: process.env.JWT_SECRET!,
};
