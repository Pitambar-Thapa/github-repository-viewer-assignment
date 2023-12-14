"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubRepoDetails = void 0;
const axios_1 = __importDefault(require("axios"));
const apiUrl_1 = require("../redirect/apiUrl");
// Handlers
const gitHubRepoDetails = async (req, reply) => {
    const { userName } = req.query;
    const URL = apiUrl_1.API_URL.GIT_REPO.replace("{userName}", userName);
    let response = [];
    try {
        response = await axios_1.default.get(URL, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            },
        });
    }
    catch (error) {
        console.log("Record not found for user: ", userName);
    }
    finally {
        return (response === null || response === void 0 ? void 0 : response.data) || [];
    }
};
exports.gitHubRepoDetails = gitHubRepoDetails;
