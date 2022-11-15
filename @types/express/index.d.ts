import { request } from "express";

export declare global {
  namespace Express {
    interface Request {
      userId: number;
      accountId: number;
    }
  }
}
