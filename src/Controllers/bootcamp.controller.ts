import { NextFunction, Request, Response } from 'express';
import BootCamp, { bootCampDocument } from '../models/bootcamp.model';
import {
    createNewBootcamp,
    findBootCampById,
    updateBootCampById,
    deleteBootCampById,
    fetchBootcampWithinRadius
} from '../Services/bootcamp.service';
import ErrorResponse from '../utils/errorRes';

export async function getAllBootcamps(req: Request, res: Response | any, next: NextFunction) {
    try {
        // const bootCamps = await fetchAllBootCamps();

        // res.status(200).json({ status: 'Success', data: bootCamps })

        res.status(200).json({ status: 'Success', data: res.advanceResults })
    } catch (e: any) {
        next(e)
    }

}

export async function getBootcampById(req: Request, res: Response, next: NextFunction) {
    try {
        const bootCamp = await findBootCampById(req.params.id);

        if (!bootCamp) {
            return next(
                new ErrorResponse('Cannot Find BootCamp', 403)
            )
        }

        res.status(201).json({ status: 'Success', data: bootCamp })

    } catch (e: any) {
        // res.status(400).json({ status: 'Failure', error: 'Resource not found' })
        next(e)
    }

}

export async function updateBootcamp(req: Request, res: Response, next: NextFunction) {
    try {
        const bootCamp = await updateBootCampById(req.params.id, req.body);

        if (!bootCamp) {
            return next(
                new ErrorResponse('Cannot Find BootCamp', 403)
            )
        }

        res.status(201).json({ status: 'Bootcamp updated Successfully', data: bootCamp })

    } catch (e: any) {
        next(e)
    }
}

export async function createBootcamp(req: Request, res: Response, next: NextFunction) {
    try {
        const bootCamp = await createNewBootcamp(req.body)

        if (!bootCamp) {
            return next(
                new ErrorResponse(`Cannot Create BootCamp`, 404)
            )
        }

        res.status(201).json({ status: 'Bootcamp Created Successfully', data: bootCamp })
    } catch (err: any) {
        next(err)
    }

}

export async function deleteBootcamp(req: Request, res: Response, next: NextFunction) {
    try {
        const bootCamp = await deleteBootCampById(req.params.id);

        res.status(201).json({ status: 'Deletion Successfull', data: {} })

    } catch (e: any) {
        next(e)
    }
}

export async function getBootcampWithinRadius(req: Request, res: Response, next: NextFunction) {
    try {
        const { zipcode, distance } = req.params;

        const bootCamps: bootCampDocument[] = await fetchBootcampWithinRadius(zipcode, +distance);

        res.status(201).json({ status: 'Success', count: bootCamps.length, data: bootCamps })
    } catch (e: any) {
        next(e)
    }

}