/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import handleMongoValidationError from '../../errors/handleMongoValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorResponse } from '../../interfaces/common';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
import ApiError from './../../errors/ApiError';

// Global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (config.node_env === 'development') {
        errorLogger.error('GlobalErrorHandler ', error);
    } else {
        errorLogger.error('GlobalErrorHandler ', error);
    }

    let statusCode: number = 500;
    let message = 'Something went wrong!!';
    let errorMessages: IGenericErrorMessage[] = [];

    if (error?.name === 'ValidationError') {
        const simplifiedError: IGenericErrorResponse = handleMongoValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof ZodError) {
        const simplifiedError: IGenericErrorResponse = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (error instanceof Error) {
        message = error.message;
        errorMessages = error?.message ? [{ path: '', message: error?.message }] : [];
    } else if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error?.message ? [{ path: '', message: error?.message }] : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.node_env != 'production' ? error.stack : null,
    });
};

export default globalErrorHandler;
