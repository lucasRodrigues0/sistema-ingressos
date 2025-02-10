export abstract class CustomError extends Error {

    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }

}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}
export class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, 403);
    }
}