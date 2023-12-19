import http from 'http';
import mongoose from 'mongoose';
import app from './app/app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const server = http.createServer(app);

async function bootstrap() {
    try {
        await mongoose.connect(config.db_url as string);
        logger.info('DB connected Successfully');
        server.listen(config.port, () => {
            logger.info(`Example app listening on port ${config.port}`);
        });
    } catch (error) {
        errorLogger.error('failed to connect database', error);
    }
}

bootstrap();
