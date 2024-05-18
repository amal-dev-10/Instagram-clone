import React from 'react'
import './NoChatView.css'
import { ReactComponent as NoChatOpenIcon } from '../../Assets/icons/noMessage.svg'
import Button from '../Button/Button'

function NoChatView() {
  return (
    <div className="noChatOpenDiv flexCenter">
        <div className="noChatCard flexCenter">
            <NoChatOpenIcon/>
            <span className='flexCenter'>
            <span className='title'>Your messages</span>
            <span className='subTitle'>Send private photos and messages to a friend or group</span>
            </span>
            <div className="buttonWrapper">
            <Button
                text='Send Messages'
                clicked={()=>{}}
                disabled={false}
            />
            </div>
        </div>
    </div>
  )
}

export default NoChatView