import mongoose from 'mongoose';
import { geocoder } from '../utils/geocoder';

export interface bootCampDocument extends mongoose.Document {
    name: string,
    slug: string,
    description: string,
    website: string,
    phone: string,
    address: string | any,
    location: {
        type: string,
        coordinates: number[] | any[],
        formattedAddress: string | any,
        street: string | any,
        city: string | any,
        state: string | any,
        zipcode: string | any,
        country: string | any

    },
    career: string[],
    averageRating: number,
    averageCost: number,
    photo: string,
    housing: boolean,
    jobAssistance: boolean,
    jobGuarantee: boolean,
    acceptGi: boolean,
    createdAt: Date
}

export const bootCampSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Please add a Name'],
            unique: true,
            trim: true,
            maxLength: [50, 'Name can only be 50 char long']
        },
        slug: String,
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters']
        },
        website: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS'
            ]
        },
        phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters']
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        location: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String
        },
        careers: {
            // Array of strings
            type: [String],
            required: true,
            enum: [
                'Web Development',
                'Mobile Development',
                'UI/UX',
                'Data Science',
                'Business',
                'Other'
            ]
        },
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [10, 'Rating must can not be more than 10']
        },
        averageCost: Number,
        photo: {
            type: String,
            default: 'no-photo.jpg'
        },
        housing: {
            type: Boolean,
            default: false
        },
        jobAssistance: {
            type: Boolean,
            default: false
        },
        jobGuarantee: {
            type: Boolean,
            default: false
        },
        acceptGi: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

bootCampSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let bootcamp = this as bootCampDocument
    const loc = await geocoder.geocode(bootcamp.address);

    bootcamp.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].state,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }

    bootcamp.address = undefined;

    next();
})

const BootCamp = mongoose.model('BootCamp', bootCampSchema);

export default BootCamp;