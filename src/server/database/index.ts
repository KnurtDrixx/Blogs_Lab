import * as mysql from "mysql";
import { sqlConfig } from "../config";

const pool = mysql.createPool(sqlConfig);

export function query<T = mysql.OkPacket>(sql: string, vals: unknown[] = []) {
  return new Promise<T>((resolve, reject) => {
    const formatted = mysql.format(sql, vals);

    pool.query(formatted, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
