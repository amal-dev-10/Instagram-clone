import { iAction, iCommentReply, iPost } from "../../Interfaces/common"

type props = {
    data: iPost | null
}

let initialState: props = {
    data: null
}

export const postReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "RESET_POST_REDUCER":
            return initialState
        case "SET_POST_LIKED":
            return {
                ...state,
                data: {
                    ...state.data,
                    likes: JSON.parse(JSON.stringify(action.payload))
                }
            }
        case "SET_COMMENT_REPLIES":
            let replies = action.payload as iCommentReply[];
            let temp = state.data?.comments || []
            replies?.forEach((x)=>{
                let find = state.data?.comments?.findIndex((y)=> y._id === x._commentId);
                if(find != undefined && find > -1 && temp){
                    let selectedReplies = temp[find].replies;
                    if(selectedReplies?.length){
                        temp[find].replies.push(x)
                    }else{
                        temp[find].replies = [x]
                    }
                }
            });
            return {
                ...state,
                data: {
                    ...state.data,
                    comments: [...temp]
                }
            }
        case "SET_POST_COMMENTS_DATA":
            return {
                ...state,
                data: {
                    ...state.data,
                    comments: [
                        ...action.payload
                    ]
                }
            }
        case "SET_POST_DATA":
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        default:
            return state
    }
}