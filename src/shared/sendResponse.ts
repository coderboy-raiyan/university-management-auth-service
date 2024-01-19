import { Response } from 'express';

type IApiResponse<T> = {
    success: boolean;
    statusCode: number;
    message?: string | null;
    data?: T | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
};

function sendResponse<T>(res: Response, data: IApiResponse<T>) {
    return res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        meta: data.meta || null,
        message: data.message || null,
        data: data.data || null,
    });
}

export default sendResponse;
