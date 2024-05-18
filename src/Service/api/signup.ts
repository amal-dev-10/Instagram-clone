import { iFieldExists, iSignUpData } from "../../Interfaces/common";
import { postData } from "../axios/serviceHandler"

export const signupWithCredentials = async (data: iSignUpData)=>{
    try{
        let res = await postData("/auth/signup", data);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const doesFieldExists = async (data: iFieldExists)=>{
    try{
        let res = await postData("/auth/doesFieldExists", data);
        return res
    }
    catch(err){
        console.log(err)
    }
}