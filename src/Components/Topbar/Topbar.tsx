import React from 'react'
import './Topbar.css'
import { ReactComponent as Instagram } from '../../Assets/icons/instagram.svg'
import { ReactComponent as Notification } from '../../Assets/icons/notification.svg'
import TextBox2 from '../TextBox2/TextBox2'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function Topbar() {
  return (
    <div className='topBar flexCenter'>
        <div className="topBarLeft">
            <div className="instagramDiv flexCenter">
                <Instagram/>
                <KeyboardArrowDownOutlinedIcon className='angleDown'/>
            </div>
        </div>
        <div className="topBarRight">
            <div className="rightComponents flexCenter">
                <TextBox2
                    placeHolder='Search'
                    type='text'
                    value=''
                    textChange={()=>{}}
                    logo={SearchOutlinedIcon}
                />
                <Notification className='notification'/>
            </div>

        </div>
    </div>
  )
}

export default Topbar