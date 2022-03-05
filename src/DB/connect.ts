import mongoose from "mongoose";
import log from "../log/logger";

export default function (DB_URI: string) {
    return mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        log.info('DB Connection Succesful')
    }).catch(error => {
        log.error(error.message)
    })
}