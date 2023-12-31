import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

function handleMongoValidationError(err: mongoose.Error.ValidationError): IGenericErrorResponse {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
        return {
            path: el?.path,
            message: el?.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
}

export default handleMongoValidationError;
