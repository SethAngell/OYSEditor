export class NoProfileConfiguredError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoProfileConfiguredError";
    }
}

export class InvalidLoginError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidLoginError";
    }
}

export class NoBlogConfiguredError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoBlogConfiguredError";
    }
}