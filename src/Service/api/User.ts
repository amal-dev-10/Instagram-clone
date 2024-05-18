import { iLike, iMessage, iPaginationProperties, iParticipant, iProfile, updatableProfile } from "../../Interfaces/common";
import { getData, patchData, postData } from "../axios/serviceHandler";

export const updateUserProfile = async (data: updatableProfile)=>{
    try{
        let res = await patchData("/user/profile", data);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getUserProfileByUsername = async (userName: string)=>{
    try{
        let res = await getData(`/user/profile/${userName}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getAllPostsPreview = async (userName: string)=>{
    try{
        let res = await getData(`/user/postPreview/${userName}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getPostById = async (id: string)=>{
    try{
        let res = await getData(`/user/post/${id}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const postComment = async (data: {})=>{
    try{
        let res = await postData(`/user/post/comment`, data);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getComments = async (postId: string)=>{
    try{
        let res = await getData(`/user/post/comment/${postId}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const fetchCommentReplies = async (commentId: string, postId: string)=>{
    try{
        let res = await getData(`/user/post/${postId}/comment/replies/${commentId}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const likePost = async (data: iLike)=>{
    try{
        let res = await postData(`/user/post/like/${data.postId}`, data);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const postSave  = async (postId: string, data: {save: boolean})=>{
    try{
        let res = await postData(`/user/post/save/${postId}`, data);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const fetchAllPosts  = async (body: iPaginationProperties)=>{
    try{
        let res = await postData(`/user/getPost`, body);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getSearchUsers  = async (search: string)=>{
    try{
        let res = await getData(`/user?search=${search}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const followProfile  = async (personToFollow: string)=>{
    try{
        let res = await postData(`/user/follow/${personToFollow}`, {});
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getConversation  = async (conversationId: string)=>{
    try{
        let res = await getData(`/user/conversation/${conversationId}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const startConversation  = async (participantId: string)=>{
    try{
        let res = await postData(`/user/conversation/${participantId}`, {});
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const sendMessage  = async (data: iMessage)=>{
    try{
        let res = await postData(`/user/message/`, data);
        return res
    }
    catch(err){
        console.log(err)
    }
}

export const getMessages  = async (conversationId: string)=>{
    try{
        let res = await getData(`/user/message/${conversationId}`);
        return res
    }
    catch(err){
        console.log(err)
    }
}
