import { iAction, iSearchedResult } from "../../Interfaces/common"

type props = {
    searched: iSearchedResult[]
}

let initialState: props = {
    searched: []
}

export const searchReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_SEARCHED_RESULT":
            return {
                ...state,
                searched: action.payload
            }
        default:
            return state
    }
}