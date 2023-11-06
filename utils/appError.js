class AppError extends Error {
    constructor() {
        super();
    }
    create(message = "Error", statusCode = 500, statusText = "Error", data = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.data = data;
        return this;
    }
}
module.exports = new AppError();