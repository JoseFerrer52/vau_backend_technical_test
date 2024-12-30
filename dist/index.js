"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const config_1 = require("./src/config/config");
const port = config_1.CONFIG.app.hostPort.port || 3000;
app_1.app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
