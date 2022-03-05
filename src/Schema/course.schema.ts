import { object, string, boolean, date } from "yup";


export const courseSchema = object({
    body: object({
        title: string().required('title is required'),
        description: string().required('description is required'),
        week: string().required('week is required'),
        tuition: string().required('is required'),
        minimumSkills: string().required('is required'),
        scholarshipAvailable: boolean().default(false),
        createdAt: date(),
        bootCamp: string()
    })
})