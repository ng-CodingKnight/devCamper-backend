import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './Config/config.env' });

const PORT = process.env.PORT || 1337

const app = express();

app.listen(
    PORT,
    () => console.log(`Server Running on ${process.env.NODE_ENV} on port ${PORT}`)
)