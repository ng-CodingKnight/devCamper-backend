import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import logger from "../log/logger";

const advanceResult = (model: any) => async (req: Request, res: Response | any, next: NextFunction) => {
    let query;

    let reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lte|lt|in)\b/g, match => `$${match}`);

    query = model.find();

    if (req.query.select) {
        let selectValue: string | any = req.query.select
        const fields = selectValue.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        let sortValue: string | any = req.query.sort
        const sortBy = sortValue.split(',').join(' ');
        query = query?.sort(sortBy);
    }

    // Pagination
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 2);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(queryStr);

    query = query.skip(startIndex).limit(limit);

    const results = await query;

    const pagination: any = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.next = {
            page: page - 1,
            limit
        }
    }

    res.advanceResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();

}

export default advanceResult;