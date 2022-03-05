import { object, string, number, boolean } from "yup";

export const bootCampSchema = object({
    body: object({
        name: string().required('Name is Required').max(50, 'Can only be 50 Char long'),
        slug: string(),
        description: string().required('Description is required'),
        address: string().required('Address is required'),
        website: string(),
        phone: string(),
        email: string(),
        career: string(),
        averageRating: number(),
        averageCost: number(),
        housing: boolean(),
        jobAssitance: boolean(),
        jobGurantee: boolean(),
        acceptGi: boolean()
    })
})