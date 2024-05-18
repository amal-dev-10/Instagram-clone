import { iAction, iPostPreview, iProfile } from "../../Interfaces/common"

interface props extends iProfile{
    _id: string,
    userName: string,
    posts: iPostPreview[]
}

let initialState: props = {
    _userId: "",
    fullName: "",
    bio: "",
    gender: "",
    website: "",
    _id: "",
    userName: "",
    posts: [],
}

export const profileReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_POSTS_PREVIEW":
            return {
                ...state,
                posts: [...action.payload]
            }
        case "SET_PROFILE_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}