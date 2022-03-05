import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from "../log/logger";

const validateRequest = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        return next();
    } catch (e: any) {
        log.error('In Validate Request', e);
        res.status(400).json({ status: 'Failed', message: 'Invalid Payload ' })
    }
}

export default validateRequest;