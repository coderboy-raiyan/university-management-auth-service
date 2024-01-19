import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './middlewares/globalErrorHandler';
import routes from './routes';

const app: Application = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application routes
app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ baseUrl: 'http://localhost:5000/', health: 'good' });
});

// Global Error handler
app.use(globalErrorHandler);

// Page not found handler

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API not found',
            },
        ],
    });
});

export default app;
