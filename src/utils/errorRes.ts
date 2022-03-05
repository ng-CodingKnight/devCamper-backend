
export default class ErrorResponse {
    public statusCode: number;
    public message: string;

    constructor(message: any, statusCode: number) {
        this.statusCode = statusCode;
        this.message = message;
    }
}