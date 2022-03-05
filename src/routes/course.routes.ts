import { Router } from 'express';
import { 
    createNewCourse, 
    deleteCourse, 
    getAllCourses, 
    getCourseById, 
    updateCourse 
} from '../Controllers/course.controller';
import validateRequest from '../Middleware/validateRequest';
import { courseSchema } from '../Schema/course.schema';

export default function (router : Router) {
    
    router.get('/', getAllCourses)

    router.get('/:id', getCourseById);

    router.put('/:id', updateCourse);

    router.post('/create', validateRequest(courseSchema), createNewCourse);

    router.delete('/:id', deleteCourse)
}


