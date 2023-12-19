/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import handleMongoValidationError from '../../errors/handleMongoValidationError';
import { IGenericErrorResponse } from '../../interfaces/common';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
import ApiError from './../../errors/ApiError';

// Global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (config.node_env === 'development') {
        console.log('GlobalErrorHandler ', err);
    } else {
        errorLogger.error('GlobalErrorHandler ', err);
    }

    let statusCode: number = 500;
    let message = 'Something went wrong!!';
    let errorMessages: IGenericErrorMessage[] = [];

    if (err?.name === 'ValidationError') {
        const simplifiedError: IGenericErrorResponse = handleMongoValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof Error) {
        message = err.message;
        errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
    } else if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.node_env != 'production' ? err.stack : null,
    });
};

export default globalErrorHandler;
