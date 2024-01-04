import { NextFunction, Request, RequestHandler, Response } from 'express';

function catchAsync(fn: RequestHandler) {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}
export default catchAsync;
