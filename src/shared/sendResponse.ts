import { Response } from 'express';

function sendResponse<T>(
    res: Response,
    data: { success: boolean; statusCode: number; message?: string | null; data?: T | null },
) {
    return res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null,
    });
}

export default sendResponse;
