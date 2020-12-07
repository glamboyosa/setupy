import { Request, Response } from 'express';
export interface context {
  req: Request & { userId: number };
  res: Response;
}
