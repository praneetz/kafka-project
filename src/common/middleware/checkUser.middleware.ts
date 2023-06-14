import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserCheckMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    console.log('=>>>>Middleaware', req.user);
    console.log(req.params)
    // if (!req.user) {
    //   return res.json({ status: false });
    // }

    next();
  }
}
