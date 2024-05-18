import React from 'react'
import './Notifications.css'

function Notifications() {
  return (
    <div className='notificationsDiv flexCenter'>
        <div className="notificationTitleDiv width100 flexCenter">
            <span className='title'>Notifications</span>
        </div>
        <div className="timeDiv width100 flexCenter">
            <span className='timeAgo'>This month</span>
        </div>
        <div className="notifications width100 flexCenter">

        </div>
    </div>
  )
}

export default Notifications