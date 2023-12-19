/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app/app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

let server: Server;

process.on('uncaughtException', (error: any) => {
    errorLogger.error(error);
    process.exit(1);
});

async function bootstrap() {
    try {
        await mongoose.connect(config.db_url as string);
        logger.info('DB connected Successfully');
        server = app.listen(config.port, () => {
            logger.info(`Example app listening on port ${config.port}`);
        });
    } catch (error) {
        errorLogger.error('failed to connect database', error);
    }
    process.on('unhandledRejection', (error: any) => {
        if (server) {
            server.close(() => {
                errorLogger.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

bootstrap();

process.on('SIGTERM', () => {
    logger.info('Sigterm is received');
    if (server) {
        server.close();
    }
});
