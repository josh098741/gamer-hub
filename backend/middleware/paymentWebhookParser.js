const bodyParser = require("body-parser");

const paymentWebhookParser = bodyParser.raw({type: "*/*"}); //For Mpesa, stripe webhooks

module.exports = paymentWebhookParser