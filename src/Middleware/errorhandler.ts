import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorRes";

const errorhandler = (err: TypeError | any, req: Request, res: Response, next: NextFunction) => {
    let error = new ErrorResponse(err.message, 400);

    // Mongoose Bad Request
    if (err.message.includes('CastError')) {
        const message = `Resource not Found`;
        error = new ErrorResponse(message, 404)
    }

    // // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered for ${err.keyValue}`;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        status: error.statusCode,
        error: error.message
    });
}

export default errorhandler;