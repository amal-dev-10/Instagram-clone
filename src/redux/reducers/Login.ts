import { iAction, iInput } from "../../Interfaces/common"
import { isEmail, isPhoneNumber } from "../../utils/common"

type props = {
    inputs: iInput[]
}

let initialState: props = {
    inputs: [
        {
            id: "email",
            type: "text",
            value: "",
            placeHolder: "Phone number, username or email"
        },
        {
            id: "password",
            type: "password",
            value: "",
            placeHolder: "Password"
        },
    ]
}

export const LoginReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_LOGIN_INPUT_VALUE":
            let input = state.inputs.map((x)=>{
                if(action.payload.id === x.id){
                    let val = action.payload.value;
                    x.value = val;
                    switch(x.id){
                        case "email":
                            x.value.length >= 5 ? x.valid = true : x.valid = false
                            break;
                        case "password":
                            x.value.length >= 8 ? x.valid = true : x.valid = false;
                            break;
                        default: 
                            break;
                    }

                }
                return x
            })
            return {
                ...state,
                inputs: [...input]
            }
        case "RESET_LOGIN":
            let t = state.inputs.map((x)=>{
                x.valid = undefined;
                x.value = ""
                return x
            })
            return {
                ...state,
                inputs: [...t]
            }
        default:
            return state;
    }
}