
const port = parseInt(process.env.PORT || 3002, 10)

const mode = process.env.NODE_ENV || "development"

const db = { 
    endpoint: 'mongodb://localhost/hackathon2023'
}

const httpCodes = { 
    success: 200,
    created: 201,
    successNoContent: 204,
    duplicate: 409,
    alreadyReported: 208,
    badRequest: 400,
    invalidPayload: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    tooManyRequests: 429,
    timeout: 408,
    conflict: 409,
    internalError: 500,
    unavailable: 503,
}

module.exports = {
    db,
    port,
    mode,
    httpCodes
}