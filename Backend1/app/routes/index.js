
module.exports = function (app) {
    app.use(require("./authRoutes"));
    app.use(require("./signatureRoutes"));
    app.use(require("./templates.routes"));
};