import { iAccountInput, iAction, iOption, iOptionsSection, iSelectOption } from "../../Interfaces/common"
import { ReactComponent as UserIcon } from '../../Assets/icons/user.svg'

type props = {
    edit: {
        inputs: iAccountInput[],
        gender: iSelectOption[]
    },
    optionSections: iOptionsSection[]
}

let initialState: props = {
    edit: {
        inputs: [
            {
                focused: false,
                inputType: "input",
                title: "Website",
                type: "text",
                value: "",
                id: "website"
            },
            {
                focused: false,
                inputType: "textArea",
                title: "Bio",
                type: "text",
                value: "",
                id: "bio"
            },
            {
                focused: false,
                inputType: "select",
                title: "Gender",
                type: "text",
                value: "",
                id: "gender"
            },
        ],
        gender: [
            {label: "Female", value: "female"},
            {label: "Male", value: "male"},
        ]
    },
    optionSections: [
        {
            options: [
                {
                    logo: UserIcon,
                    text: "Edit Profile",
                    route: "/accounts/edit",
                    selected: false,
                    subOptions: [],
                    behaviour: null,
                    id: "accountsedit"
                }
            ],
            title: "How you use Instagram"
        }
    ]
}

export const accountsReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "EDIT_INPUT_CHANGED":
            let id = action.payload.id;
            let value = action.payload.value;
            let temp = state.edit.inputs.map((x)=>{
                if(x.id === id){
                    x.value = value;
                }
                return x
            })
            return {
                ...state,
                edit: {
                    ...state.edit,
                    inputs: [...temp]
                }
            }
        case "MAP_VALUE_TO_INPUTS":
            let data = action.payload as {id: string, value: string}[];
            let t = state.edit.inputs.map((x)=>{
                let find = data.find((y)=> y.id === x.id);
                if(find){
                    x.value = find.value
                }
                return x
            });
            return {
                ...state,
                edit: {
                    ...state.edit,
                    inputs: JSON.parse(JSON.stringify(t))
                }
            }
        default:
            return state
    }
}