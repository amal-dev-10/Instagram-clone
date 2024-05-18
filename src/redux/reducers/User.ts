import { iAction, iProfile } from "../../Interfaces/common"

interface props extends iProfile  {
    token: string,
    userName: string,
    _id: string
}

let initialState: props = {
    _id: "",
    _userId: "",
    fullName: "",
    bio: "",
    gender: "",
    website: "",
    token: "",
    userName: "",
    savedPost: []
}

export const userReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_POST_SAVED":
            return {
                ...state,
                savedPost: action.payload
            }
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "UPDATE_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}