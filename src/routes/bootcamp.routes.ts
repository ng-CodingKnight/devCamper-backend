import { Router } from "express";
import { createBootcamp, deleteBootcamp, getAllBootcamps, getBootcampById, updateBootcamp, getBootcampWithinRadius } from "../Controllers/bootcamp.controller";
import { bootCampSchema } from "../Schema/bootCamp.schema";
import validateRequest from "../Middleware/validateRequest";
import BootCamp from "../models/bootcamp.model";
import advanceResult from "../Middleware/advanceResult"

export default function (router: Router) {
    router.get('/', advanceResult(BootCamp), getAllBootcamps);

    router.get('/:id', getBootcampById);

    router.get('/radius/:zipcode/:distance', getBootcampWithinRadius)

    router.put('/:id', updateBootcamp);

    router.post('/create', validateRequest(bootCampSchema), createBootcamp);

    router.delete('/:id', deleteBootcamp)
}