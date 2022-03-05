import mongoose, { Schema } from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a Title for Course']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    weeks: {
        type: String,
        required: [true, 'Please add a Week']
    },
    tuition: {
        type: String,
        required: [true, 'Please add tuition details']
    },
    minimumSkills: {
        type: String,
        required: [true, 'Please add minimum skills'],
        enum: ["beginner", "intermediate", "advanced"]
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    bootCamp: {
        type: Schema.Types.ObjectId,
        ref: 'BootCamp',
        required: true
    }

})

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;