import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverURL"

/////register API'
export const registerAPI=async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}
////login API
export const loginAPI=async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

//add-project api
export const addProjectAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//get-home-projects api
export const getHomeprojectAPI=async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/gethomeproject`,"","")
}
//get- all project api
export const getallprojectAPI=async (searchkey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/getallprojects?search=${searchkey}`,"",reqHeader)
}
//get-user project api
export const getuserprojectAPI=async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/getuserprojects`,"",reqHeader)
}

//user/edit
export const updateUserProfileAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}

//project/edit
export const updateProjectAPI=async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//remove-project
export const deleteProjectAPI=async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
}