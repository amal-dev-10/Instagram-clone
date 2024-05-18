import { iCommentReply, iConversation, iLike, iPopUp, iPost, iPostComment, iPostLikes, iPostPreview, iPostPreviewMain, iProfile, iSavedPost, iSearchedResult, iSelectChat, iSetConversations, iSetMessage, iUser, updatableProfile } from "../../Interfaces/common"

export const SelectOptionAction = (payload: string)=>{
    return {
        type: "SELECT_OPTION",
        payload: payload
    }
}

export const setMinifiedAction = (payload: boolean)=>{
    return {
        type: "SET_MINIFIED",
        payload: payload
    }
}

export const setMobileModeAction = (payload: boolean)=>{
    return {
        type: "SET_MOBILE_MODE",
        payload: payload
    }
}

export const selectMessageTabAction = (payload: string)=>{
    return {
        type: "SELECT_MESSAGE_TAB",
        payload: payload
    }
}

export const setExtensionAction = (payload: JSX.Element | null)=>{
    return {
        type: "SET_EXTENSION",
        payload: payload
    }
}

export const setWindowPropertiesAction = (payload: {})=>{
    return {
        type: "SET_WINDOW_PROPERTIES",
        payload: payload
    }
}

export const setSignUpInputValueAction = (payload: {id: string, value: string})=>{
    return {
        type: "SET_SIGNUP_INPUT_VALUE",
        payload: payload
    }
}

export const setSignUpInputValidOrNot = (payload: {id: string, valid: boolean})=>{
    return {
        type: "SET_SIGN_UP_INPUT_VALID_OR_NOT",
        payload: payload
    }
}

export const setLoginInputValueAction = (payload: {id: string, value: string})=>{
    return {
        type: "SET_LOGIN_INPUT_VALUE",
        payload: payload
    }
}

export const resetSignUpAction = ()=>{
    return {
        type: "RESET_SIGN_UP",
        payload: null
    }
}

export const resetLoginAction = ()=>{
    return {
        type: "RESET_LOGIN",
        payload: null
    }
}

export const setUserAction = (payload: iProfile & {token: string, userName: string})=>{
    return {
        type: "SET_USER_DATA",
        payload: payload
    }
}

export const changeEditInputAction = (payload: {id: string, value: string})=>{
    return {
        type: "EDIT_INPUT_CHANGED",
        payload: payload
    }
}

export const showPopUpAction = (payload: iPopUp)=>{
    return {
        type: "SHOW_POPUP",
        payload: payload
    }
}

export const setProfileDataAction = (payload: iProfile)=>{
    return {
        type: "SET_PROFILE_DATA",
        payload: payload
    }
}

export const updateUserDataAction = (payload: updatableProfile)=>{
    return {
        type: "UPDATE_USER_DATA",
        payload: payload
    }
}

export const mapValueToEditInputsAction = (payload: {id: string, value: string}[])=>{
    return {
        type: "MAP_VALUE_TO_INPUTS",
        payload: payload
    }
}

export const setPostsPreviewAction = (payload: iPostPreview[])=>{
    return {
        type: "SET_POSTS_PREVIEW",
        payload: payload
    }
}


export const setPostDataAction = (payload: iPost | null)=>{
    return {
        type: "SET_POST_DATA",
        payload: payload
    }
}

export const setPostCommentsAction = (payload: iPostComment[])=>{
    return {
        type: "SET_POST_COMMENTS_DATA",
        payload: payload
    }
}

export const setCommentRepliesAction = (payload: iCommentReply[])=>{
    return {
        type: "SET_COMMENT_REPLIES",
        payload: payload
    }
}

export const setPostLikesAction = (payload: [])=>{
    return {
        type: "SET_POST_LIKED",
        payload: payload
    }
}

export const setSavedPostAction = (payload: iSavedPost[])=>{
    return {
        type: "SET_POST_SAVED",
        payload: payload
    }
}

export const resetPostReducerAction = (payload: null)=>{
    return {
        type: "RESET_POST_REDUCER",
        payload: payload
    }
}

export const setMainPostPreviewAction = (payload: iPostPreviewMain[])=>{
    return {
        type: "SET_MAIN_POST_PREVIEW",
        payload: payload
    }
}

export const setHomePostPreviewLikesAction = (payload: {id: string, data: iPostLikes[]})=>{
    return {
        type: "SET_HOME_LIKED_POST",
        payload: payload
    }
}

export const setSearchedResultAction = (payload: iSearchedResult[])=>{
    return {
        type: "SET_SEARCHED_RESULT",
        payload: payload
    }
}

export const setSelectedChatAction = (payload: iSelectChat)=>{
    return {
        type: "SELECT_CONVERSATION",
        payload: payload
    }
}

export const setChatConversationsAction = (payload: iSetConversations)=>{
    return {
        type: "SET_CHAT_CONVERSATION",
        payload: payload
    }
}

export const setMessagesAction = (payload: iSetMessage)=>{
    return {
        type: "SET_MESSAGES",
        payload: payload
    }
}