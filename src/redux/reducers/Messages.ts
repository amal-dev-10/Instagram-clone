import { iAction, iConversation, iMessageTabs, iSetMessage } from "../../Interfaces/common"

type props = {
    messageTabs: iMessageTabs[],
    selectedChatId: number
}

let initialState: props = {
    messageTabs: [
        {
            conversations: [],
            selected: true,
            tabName: "Primary"
        },
        {
            conversations: [],
            selected: false,
            tabName: "General"
        },
        {
            conversations: [],
            selected: false,
            tabName: "Requests"
        },
    ],
    selectedChatId: -1
}

export const MessagesReducer = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_MESSAGES":
            let payload = action.payload as iSetMessage;
            let tem = state.messageTabs.map((x)=>{
                if(x.tabName.toLowerCase() === payload.sectionId){
                    let c = x.conversations.map((y)=>{
                        if(y.conversationId === payload.conversationId){
                            y.messages = [...y.messages, ...payload.messages] as any
                        }
                        return y
                    });
                    x.conversations = c;
                }
                return x
            })
            return {
                ...state,
                messageTabs: JSON.parse(JSON.stringify([...tem])),
            }
        case "SET_CHAT_CONVERSATION":
            let secId: string = action.payload.sectionId;
            let conversations: iConversation[] = action.payload.conversations;
            let te = state.messageTabs.map((x)=>{
                if(x.tabName.toLowerCase() === secId){
                    x.conversations = conversations
                }
                return x
            })
            return {
                ...state,
                messageTabs: JSON.parse(JSON.stringify([...te])),
            }
        case "SELECT_CONVERSATION":
            let sectionId: string = action.payload.sectionId;
            let conversationId: string = action.payload.conversationId;
            let select: boolean = action.payload.select;
            let selectedChat: number = -1;
            let t = state.messageTabs.map((x)=>{
                if(x.tabName.toLowerCase() === sectionId){
                    let convs = x.conversations.map((y, i: number)=> {
                        if(y.conversationId === conversationId){
                            y.selected = select;
                            if(select){
                                selectedChat = i;
                            }else{
                                selectedChat = -1;
                            }
                        }else{
                            y.selected = false
                        }
                        return y
                    });
                    x.conversations = convs
                }
                return x
            })
            return {
                ...state,
                messageTabs: JSON.parse(JSON.stringify([...t])),
                selectedChatId: selectedChat
            } as props
        case "SELECT_MESSAGE_TAB":
            let temp = state.messageTabs?.map((x)=>{
                if(x.tabName.toLowerCase() === action.payload.toLowerCase()){
                    x.selected = true
                }else{
                    x.selected = false
                }
                return x
            })
            return {
                ...state,
                messageTabs: temp
            }
            break;
        default:
            return state
    }
}