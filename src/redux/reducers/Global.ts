import { iAction, iPopUp } from "../../Interfaces/common"

interface props {
    mobileMode: boolean,
    minified: boolean,
    sideBarExtension: JSX.Element | null,
    window: {width: number, height: number},
    popUp: iPopUp
}

let initialState: props = {
    mobileMode: false,
    minified: false,
    sideBarExtension: null,
    window: {
        height: 0,
        width: 0
    },
    popUp: {
        show: false,
        type: null
    }
}

export const globalReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SHOW_POPUP":
            let payload = action.payload as iPopUp
            return {
                ...state,
                popUp: {
                    ...state.popUp,
                    show: payload.show,
                    type: payload.type
                }
            }
        case "SET_WINDOW_PROPERTIES":
            return {
                ...state,
                window: {
                    ...action.payload
                }
            }
        case "SET_EXTENSION":
            return {
                ...state,
                sideBarExtension: action.payload
            }
        case "SET_MINIFIED":
            return {
                ...state,
                minified: action.payload
            }
        case "SET_MOBILE_MODE":
            return {
                ...state,
                mobileMode: action.payload
            }
        default:
            return state
    }
}