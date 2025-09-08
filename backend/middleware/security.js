const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const securityMiddleware = (app) => {
    app.use(helmet());//Set secure http headers

    app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));//Enable CORS for frontend domain

    //DATA sanitization aganist noSQL injections
    app.use(mongoSanitize());

    //Prevent HTTP parameter pollution
    app.use(xss());

    //Prevent HTTP parameter polution
    app.use(hpp());

    //Rate limiter (e.g, 100 requests per 15 minutes)
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: "Too many requests from this IP please try again later"
    });
    app.use(limiter);
}

module.exports = securityMiddleware;