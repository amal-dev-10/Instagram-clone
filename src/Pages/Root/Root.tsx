import React, { useEffect, useState } from 'react'
import './Root.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router'
import { connect } from 'react-redux'
import Topbar from '../../Components/Topbar/Topbar'
import CreatePopUp from '../../Components/CreatePopUp/CreatePopUp'
import MorePopUp from '../../Components/MorePopUp/MorePopUp'
import { SelectOptionAction, setMessagesAction, setMinifiedAction, setMobileModeAction, setWindowPropertiesAction } from '../../redux/actions'
import { iMessage, iOption, iResponse, iSetMessage } from '../../Interfaces/common'
import socket from '../../socket/socket'

type props = {
  mobileMode: boolean,
  minified: boolean,
  extension: JSX.Element | null
  setMinified: any,
  setMobileMode: any,
  options: iOption[],
  selectOption: any,
  setWindowProperties: any,
  setMessages: any
}

function Root({ mobileMode, minified, setMessages, extension, setMinified, setMobileMode, options, selectOption, setWindowProperties }: props) {
  const loc = useLocation();
  const exploreRegEx = /^\/explore\/?$/;
  const reelRegEx = /^\/reels\/[A-Za-z0-9_-]+\/?$/;
  const profileRegEx = /^\/[A-Za-z0-9_-]+\/?$/;
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  //responsive calculation
  const responsiveCalculation = (width: number)=>{
    if(width < 770){
        setMobileMode(true)
    }else{
        setMobileMode(false)
    }
    if(width < 1262){
        setMinified(true)
    }else{
        setMinified(false)
    }
  }

  const socketConnection = ()=>{
    socket.on("subscribeToChatConversation", (data)=>{
    })

    socket.on("onChangeInChat", (data)=>{
      console.log(data, "changeChat")
    })

    socket.on("onMessage", (data: iMessage)=>{
      setMessages({
        conversationId: data._conversationId,
        sectionId: "primary",
        messages: [data]
      });
    })
  }

  const test = ()=>{
    socket.emit("message", "from client")
  }

  useEffect(()=>{ 
    responsiveCalculation(window.innerWidth);
  }, [loc.pathname]);
  
  useEffect(()=>{
    socketConnection()
    responsiveCalculation(window.innerWidth);
    window.addEventListener('resize', (e: UIEvent)=>{
        let width = (e.target as any).innerWidth;
        let height = (e.target as any).innerHeight;
        responsiveCalculation(width);
        setWindowProperties({width: width, height: height})
    });

    options.find((x)=>{
      if(exploreRegEx.test(loc.pathname)){
        selectOption("explore");
      }else if(reelRegEx.test(loc.pathname)){
        selectOption("reels");
      }else if(profileRegEx.test(loc.pathname)){
        selectOption("profile");
      }else if(loc.pathname === "/"){
        selectOption("home")
      }
    });

  }, []);

  return (
    <div className='frame flexCenter'>
      <div className={`sideWrapper ${mobileMode ? "mobileMode" : ""}`}>
        <Sidebar
          clickCreate={()=>{setShowCreate(!showCreate); test()}}
          clickShowMore={()=>{setShowMore(!showMore)}}
        />
      </div>
      <div className={`tab flexCenter ${minified && !extension ? "minified" : "rootOutlet"} ${mobileMode ? "mobileMode" : ""}`}>
          <Outlet/>
      </div>
      {
          mobileMode && 
          <div className="topBarWrapper">
            <Topbar/>
          </div>
      }  
      {
        extension && !mobileMode ? 
          <div className="extensionWrapper">
            {
              extension
            }
          </div>
        : <></>
      }
      {
        showCreate &&
        <CreatePopUp showCreate={(e: boolean)=>{setShowCreate(e)}}/>
      }
      {
        showMore && !mobileMode &&
        <MorePopUp/>
      }
    </div>
  )
}

const mapStateToProps = (state: any)=>({
  minified: state.global.minified,
  mobileMode: state.global.mobileMode,
  extension: state.global.sideBarExtension,
  options: state.home.options
})

const mapDispatchToProps = (dispatch: any)=>({
  setMinified: (minified: boolean)=>{dispatch(setMinifiedAction(minified))},
  setMobileMode: (mobileMode: boolean)=>{dispatch(setMobileModeAction(mobileMode))},
  selectOption: (id: string)=>{dispatch(SelectOptionAction(id))},
  setWindowProperties: (data: {})=>{dispatch(setWindowPropertiesAction(data))},
  setMessages: (data: iSetMessage)=>{dispatch(setMessagesAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)