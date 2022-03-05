import express from 'express';
import dotenv from 'dotenv';
import bootcampRoutes from './routes/bootcamp.routes';
import log from './log/logger';
import connect from './DB/connect';
import errorhandler from './Middleware/errorhandler';

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 1337

const router = express.Router()

const app = express();

app.use(express.json());
app.use(`${process.env.BASE_PATH}/bootcamp`, router);
app.use(`${process.env.BASE_PATH}/course`, router)
app.use(errorhandler)

app.listen(
    PORT,
    () => {
        connect(process.env.DB_URL || '')

        log.info(`Server Running at ${PORT} in ${process.env.NODE_ENV} env`);

        bootcampRoutes(router)
    }
)