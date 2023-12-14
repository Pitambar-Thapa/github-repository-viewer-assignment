import axios from "axios";
import { API_URL } from "../redirect/apiUrl";
// Handlers
export const gitHubRepoDetails = async (req:any, reply:any) => {
    const { userName } = req.query;
    const URL = API_URL.GIT_REPO.replace("{userName}", userName);
    let response:any = [];
    try{
        response = await axios.get(URL, {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            },
        });
    }catch(error){
        console.log("Record not found for user: ", userName);
    }finally{
        return response?.data||[];
    }
}