import { gitHubRepoDetails } from "../controller/githubController";

export const routes = [{
        method: 'GET',
        url: '/api/github/repo',
        handler: gitHubRepoDetails
    }
]