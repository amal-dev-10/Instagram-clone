import { iLoginData } from "../../Interfaces/common";
import { postData } from "../axios/serviceHandler";

export const loginWithCredentials = async (data: iLoginData)=>{
    try{
        let res = await postData("/auth/login", data);
        return res
    }
    catch(err){
        console.log(err)
    }
}