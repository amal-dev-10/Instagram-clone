import React, { useEffect, useReducer, useState } from 'react'
import './Messages.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { ReactComponent as EditIcon } from '../../Assets/icons/edit.svg'
import { connect } from 'react-redux'
import { selectMessageTabAction, setChatConversationsAction, setSelectedChatAction } from '../../redux/actions'
import { iConversation, iMessageTabs, iProfile, iResponse, iSelectChat, iSetConversations } from '../../Interfaces/common'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { getConversation } from '../../Service/api/User'
import ButtonSpinner from '../../Components/ButtonSpinner/ButtonSpinner'

type props = {
  tabs: iMessageTabs[],
  selectTab: any,
  setConversations: any,
  selectConversation: any,
  user: iProfile & {userName: string}
}

function Messages(props: props) {
  const nav = useNavigate();
  const loc = useLocation();
  const [findConv, setFindConv] = useState<iConversation[]>([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [loading, setLoading] = useState<boolean>(false);

  // const getData = async ()=>{
  //   let convId: string = loc.pathname.split("/")?.[3] || "";
  //   if(convId){
  //     let res: iResponse = await getConversation(convId);
  //     if(res?.status === 200){
  //       console.log(res.data)
  //     }
  //   }
  // }

  const getAllConversations = async ()=>{
    setLoading(true);
    let res: iResponse = await getConversation("all");
    if(res?.status === 200){
      props.setConversations({
        sectionId: "primary",
        conversations: res.data,
      });
      doUpdates();
    }
    setLoading(false);
  }

  const doUpdates = ()=>{
    let find = props.tabs.find((x)=> x.selected);
    let convId: string = loc.pathname.split("/")?.[3] || ""
    console.log(convId, "check")
    setFindConv(find?.conversations || []);
    props.selectConversation({
      sectionId: "primary",
      select: true,
      conversationId: convId
    })
  }

  useEffect(()=>{
    // getData();
    doUpdates();
    getAllConversations();
  }, [loc.pathname])

  return (
    <div className="messageMainWrapper flexCenter">
      <div className="messageLeft flexCenter">
        <div className="leftTop width100">
          <div className="userNameDiv width100 flexCenter">
            <span className='userName'>{props.user.userName}</span>
            <EditIcon/>
          </div>
          <div className="topTabs flexCenter width100">
            {
              props.tabs.map((x)=>{
                return (
                  <div 
                    className={`topTab flexCenter ${x.selected ? "selected" : ''}`}
                    onClick={()=>{props.selectTab(x.tabName)}}
                  >
                    <span>{x.tabName}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="leftBottom flexCenter">
          <div className="conversationCardDiv flexCenter width100">
            {
              loading &&
              <div className="spinner flexCenter width100">
                <ButtonSpinner/>
              </div>
            }
            {
              props.tabs[0].conversations.map((x)=>{
                return (
                  !x.temporary ?
                  <div className={`convCard width100 flexCenter ${x.selected ? "selected" : ''}`} onClick={()=>{nav(`/direct/t/${x.conversationId}`)}}>
                    <div className="profileImg flexCenter">
                      <span className="profileAlt flexCenter">
                        <span className="onlineMarker flexCenter"></span>
                      </span>
                    </div>
                    <div className="convDetails flexCenter">
                      <span className='convName'>{x.chatName}</span>
                      <span className='agoTime'>Active 3h ago</span>
                    </div>
                  </div>
                  : <></>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="messageRight">
        <Outlet/>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
  tabs: state.messages.messageTabs,
  user: state.user
})

const mapDispatchToProps = (dispatch: any)=>({
  selectTab: (id: string)=>{dispatch(selectMessageTabAction(id))},
  setConversations: (data: iSetConversations)=>{dispatch(setChatConversationsAction(data))},
  selectConversation: (data: iSelectChat)=>{dispatch(setSelectedChatAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)