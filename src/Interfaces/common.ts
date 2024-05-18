import React, { ReactElement } from "react"

export interface iAction {
    type: string,
    payload: any
}

export interface iOption {
    text: string,
    logo?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    selected: boolean,
    route: string,
    subOptions: iSubOption[],
    behaviour: iOptionBehaviour | null,
    id: string
}

export interface iOptionsSection {
    title: string, 
    options: iOption[]
}

export interface iOptionBehaviour {
    sidebarMinified: boolean,
    popup: boolean,
    extension?: JSX.Element | null,
    popUpComponent?: JSX.Element
}

export interface iSubOption {
    logo?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    text: string,
    route: string
}

export interface iMessageTabs {
    tabName: string,
    selected: boolean,
    conversations: iConversation[]
}

export interface iConversation {
    chatName: "",
    conversationId: "",
    lastSeen: "",
    messages: iMessage[],
    selected: boolean,
    temporary: boolean,
    _userId: string
}

export interface iInput {
    placeHolder?: string,
    type: string,
    value: string,
    id: string,
    valid?: boolean
}

export interface iResponse {
    status: number,
    message: string,
    data?: any
}

export interface iSignUpData {
    email?: string,
    mobileNumber?: string,
    password: string,
    userName: string,
    fullName: string
}

export interface iLoginData {
    emailOrMobileNumberOrUserName: string,
    password: string,
}

export interface iButton {
    text: string,
    disabled: boolean,
    loading?: boolean
}

export interface iFieldExists {
    fieldName: string,
    value: string
}

export interface iUser {
    _id: string,
    emailOrPhoneNumber: string,
    userName: string
}

export interface iAccountInput {
    title: string,
    type: string,
    inputType: "textArea" | "input" | "select",
    focused: boolean,
    value: string,
    id: string
}

export interface iSelectOption {
    label: string,
    value: string
}

export interface iSavedPost {
    _id: string,
    _postId: string
}

export interface iFollower {
    _userId: string
}

export interface iFollowing {
    _userId: string
}

export interface iProfile {
    fullName: string,
    _userId: string,
    bio?: string,
    website?: string,
    gender?: string,
    savedPost?: iSavedPost[],
    followers?: iFollower[],
    following?: iFollowing[],
}


export interface iPopUp {
    type: "uploadPost" | null,
    show: boolean
}

export interface iPaginationProperties {limit: number, page: number}

export interface updatableProfile {
    bio?: string,
    website?: string,
    gender?: string
}

export interface iPostPreview {
    media: string[],
    _userId: string,
    _id: string,
    numberOfLikes?: number,
    numberOfComments?: number
}

export interface iPostAdvancedSettings {
    hideComment: boolean,
    hideLikeAndView: boolean,
    _id: string
}

export interface iPostLikes {
    _userId: string,
    _id: string
}

export interface iCommentReply {
    _id: string,
    _commentId: string,
    _userId: string,
    userName: string,
    content: string,
    created: string,
    likes: string[]
}

export interface iPostComment{
    _userId: string,
    userName: string,
    content: string,
    _id: string,
    created: string,
    likes: string[],
    replies: iCommentReply[],
    repliesCount: number
}

export interface iPost {
    _id: string,
    _userId: string,
    media: string[],
    advancedSettings: iPostAdvancedSettings,
    likes?: iPostLikes[],
    comments?: iPostComment[],
    created: string,
    modified: string,
    caption: string,
    userName: string
}

export interface iLike{
    like: 0 | 1,
    postId: string,
    userName: string
}

export interface iPostPreviewMain {
    _id: string,
    _userId: string,
    media: string[],
    advancedSettings: iPostAdvancedSettings,
    likes?: iPostLikes[],
    created: string,
    modified: string,
    caption: string,
    userName: string,
    noOfComments: number,
    image?: number,
}

export interface iPaginationProperties {
    limit: number, 
    page: number,
    totalRecords?: number
}

export interface iSearchedResult {
    userName: string,
    fullName: string,
    _userId: string
}

export interface iParticipant {
    _userId: string
}

export interface iCoversation {
    participants: iParticipant[],
    createdAt: string,
    modifiedAt: string
}

export interface iMessage{
    _conversationId: string,
    _senderId: string,
    content: string,
    createdAt: string,
    _receiverId: string
}

export interface iMessage {
    _senderId: string, 
    _receiverId: string, 
    _conversationId: string,
    content: string,
    createdAt: string
}

export interface iSelectChat {
    sectionId: string, 
    conversationId: string, 
    select: boolean
}

export interface iSetConversations {
    sectionId: string, 
    conversations: iConversation[],
}

export interface iSetMessage {
    conversationId: string, 
    sectionId: string,
    messages: iMessage[]
}