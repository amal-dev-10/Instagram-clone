import React, { useEffect, useReducer, useState } from 'react'
import './ChatBox.css'
import { ReactComponent as CallIcon } from '../../Assets/icons/call.svg'
import { ReactComponent as CameraIcon } from '../../Assets/icons/camera.svg'
import { ReactComponent as RoundInfoIcon } from '../../Assets/icons/roundInfo.svg'
import { ReactComponent as EmojiIcon } from '../../Assets/icons/emoji.svg'
import { ReactComponent as MicIcon } from '../../Assets/icons/mic.svg'
import { ReactComponent as MediaIcon } from '../../Assets/icons/media.svg'
import { ReactComponent as LoveIcon } from '../../Assets/icons/notification.svg'
import { connect } from 'react-redux'
import { iConversation, iMessage, iMessageTabs, iProfile, iResponse, iSetMessage } from '../../Interfaces/common'
import { useLocation } from 'react-router'
import { getMessages, sendMessage } from '../../Service/api/User'
import { setMessagesAction } from '../../redux/actions'
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner'

type props = {
    tabs: iMessageTabs[],
    setMessages: any,
    selectedIndex: number,
    user: iProfile & {userName: string}
}

function ChatBox({ tabs, setMessages, selectedIndex, user }: props) {
    const loc = useLocation()
    const [selectedChat, setSelectedChat] = useState<iConversation>();
    const [msg, setMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const sendMessageEvent = async (code: string)=>{
        if(code.toLowerCase() === "enter"){
            let res: iResponse = await sendMessage({
                _conversationId: selectedChat?.conversationId,
                _receiverId: selectedChat?._userId,
                content: msg,
            } as any) ;
            setMsg("");
            if(res?.status === 200){
                setMessages({
                    conversationId: selectedChat?.conversationId,
                    sectionId: "primary",
                    messages: [res.data]
                });
                doUpdates()
                forceUpdate()
            }
        }
    }

    const getMessagesNow = async ()=>{
        setLoading(true);
        let convId: string = loc.pathname.split("/")?.[3] || ""
        if(convId){
            let res: iResponse = await getMessages(convId);
            if(res?.status === 200){
                console.log(res.data)
                setMessages({
                    conversationId: res.data?._conversationId,
                    sectionId: "primary",
                    messages: res.data.messages
                });
            }
        }
        setLoading(false);
    }

    const doUpdates = ()=>{
        let findChat = tabs.find(x=> x.selected)?.conversations.find(x=> x.selected);
        setSelectedChat(findChat)
    }

    useEffect(()=>{
        doUpdates()
        getMessagesNow();
    }, [selectedIndex])

    // useEffect(()=>{
    //     getMessagesNow();
    // }, [loc.pathname])

  return (
    !loading ?
    <div className="chatDiv flexCenter width100">
        <div className="chatTop width100 flexCenter">
            <div className="convCard width100 flexCenter">
            <div className="profileImg flexCenter">
                <span className="profileAlt flexCenter">
                <span className="onlineMarker flexCenter"></span>
                </span>
            </div>
            <div className="convDetails flexCenter">
                <span className='convName'>{selectedChat?.chatName}</span>
                <span className='agoTime'>Active 3h ago</span>
            </div>
            </div>
            <div className="chatTopRight flexCenter">
                <CallIcon/>
                <CameraIcon/>
                <RoundInfoIcon/>
            </div>
        </div>
        <div className="chatContent width100 flexCenter">
            {/*  */}
            <div className="chatWrapper flexCenter width100">
                <span className="time">3 May 2024, 12:41</span>
                {
                    selectedChat?.messages.map((x)=>{
                        return (
                            <div className={`chatBubbleWrapper flexCenter width100 ${x._senderId === user._userId ? "mine" : ''}`}>
                                <div className={`chatBubble flexCenter`}>
                                    <span className="chatContent">{x.content}</span>
                                    {/* <span className="chatTime">20:23</span> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/*  */}
        </div>
        <div className="chatBoxDiv width100 flexCenter">
            <div className="chatInput width100 flexCenter">
                <EmojiIcon/>
                <input 
                    type="text" 
                    placeholder='Message...' 
                    className='chatIn'
                    onChange={(e)=>{setMsg(e.target.value)}}
                    value={msg}
                    onKeyUp={(e)=>{
                        sendMessageEvent(e.code)
                    }}
                />
                <div className="chatInputRight flexCenter">
                    <MicIcon/>
                    <MediaIcon/>
                    <LoveIcon/>
                </div>
            </div>
        </div>
    </div> : 
    <div className="spinner flexCenter width100">
        <ButtonSpinner/>
    </div>
  )
}


const mapDispatchToProps = (dispatch: any)=>({
    setMessages: (data: iSetMessage)=>{dispatch(setMessagesAction(data))}
})

const mapStateToProps = (state: any)=>({
    tabs: state.messages.messageTabs,
    selectedIndex: state.messages.selectedChatId,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)