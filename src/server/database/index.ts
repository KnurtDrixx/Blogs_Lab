import * as mysql from "mysql";
import { sqlConfig } from "../config";

const pool = mysql.createPool(sqlConfig);

export function query<T = mysql.OkPacket>(sql: string, vals?: unknown[]) {
  return new Promise<T>((resolve, reject) => {
    pool.query(sql, vals, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
