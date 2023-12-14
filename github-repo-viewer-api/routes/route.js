"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const githubController_1 = require("../controller/githubController");
exports.routes = [{
        method: 'GET',
        url: '/api/github/repo',
        handler: githubController_1.gitHubRepoDetails
    }
];
