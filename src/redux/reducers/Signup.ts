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
            placeHolder: "Mobile Number or Email"
        },
        {
            id: "fullName",
            type: "text",
            value: "",
            placeHolder: "Full Name"
        },
        {
            id: "userName",
            type: "text",
            value: "",
            placeHolder: "Username"
        },
        {
            id: "password",
            type: "password",
            value: "",
            placeHolder: "Password"
        },
    ]
}

export const signUpReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_SIGNUP_INPUT_VALUE":
            let input = state.inputs.map((x)=>{
                if(action.payload.id === x.id){
                    let val = action.payload.value;
                    x.value = val;
                    switch(x.id){
                        case "email":
                            isPhoneNumber(x.value) || isEmail(x.value) ? x.valid = true : x.valid = false;
                            break;
                        case "fullName":
                            (x.value.length >= 3 && x.value.length <= 20) ? x.valid = true : x.valid = false;
                            break;
                        case "password":
                            x.value.length >= 8 && x.value.length <= 15 ? x.valid = true : x.valid = false;
                            break;
                        case "userName":
                            x.value.length >= 5 && x.value.length <= 15 ? x.valid = true : x.valid = false;
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
        case "SET_SIGN_UP_INPUT_VALID_OR_NOT":
            let data = action.payload as {id: string, valid: boolean}
            let d = state.inputs.map((x)=>{
                if(x.id === data.id){
                    x.valid = data.valid
                }
                return x
            })
            return {
                ...state,
                inputs: [...d]
            }
        case "RESET_SIGN_UP":
            return {
                ...state,
                inputs: [...initialState.inputs]
            }
        default:
            return state;
    }
}