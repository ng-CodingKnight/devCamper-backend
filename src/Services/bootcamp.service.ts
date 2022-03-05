import BootCamp from "../models/bootcamp.model";
import { geocoder } from "../utils/geocoder";


export async function findBootCampById(id: string) {
    try {
        const bootCamp = await BootCamp.findById(id);

        return bootCamp
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function fetchBootcampWithinRadius(zipcode: string, distance: number) {
    try {
        const loc = await geocoder.geocode(zipcode);

        const lat = loc[0].latitude;
        const lon = loc[0].longitude

        let radius = distance / 3963;

        const bootCamps = await BootCamp.find({
            location: { $geoWithin: { $centerSphere: [[lon, lat], radius] } }
        })

        return bootCamps;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function createNewBootcamp(body: any) {

    const bootCamp = await BootCamp.create(body);

    return bootCamp;
}

export async function updateBootCampById(id: string, body: any) {
    try {
        const bootCamp = await BootCamp.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })

        return bootCamp
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function deleteBootCampById(id: string) {
    try {
        await BootCamp.findByIdAndDelete(id)

        return true
    } catch (e: any) {
        throw new Error(e);
    }
}