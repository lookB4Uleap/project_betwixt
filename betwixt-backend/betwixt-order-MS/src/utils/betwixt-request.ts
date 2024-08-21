import { Request } from "express";

export interface BetwixtRequest extends Request {
    userId?: string;
}