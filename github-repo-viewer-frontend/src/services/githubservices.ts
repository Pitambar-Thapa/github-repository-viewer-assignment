import axios from "axios"
import { API_URL } from "../redirect/apiUrl";

export const getGitHubRepoDetails:any = (userName:String)=>{
    const URL = `${API_URL.SERVER_REPO_URL}?userName=${userName}`;
    return axios.get(URL)
                .then(response=> {
                    return response.data;
                })
                .catch(error=> {
                    return error;
                });
}