import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

function handleCastError(error: mongoose.Error.CastError) {
    const errors: IGenericErrorMessage[] = [
        {
            path: error.path,
            message: error.message,
        },
    ];

    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors,
    };
}

export default handleCastError;
