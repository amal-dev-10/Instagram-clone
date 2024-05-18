import React from 'react'
import './PopUp.css'
import { ReactComponent as CrossIcon } from '../../Assets/icons/cross.svg'
import { Outlet, useNavigate } from 'react-router'
import UploadPostDialog from '../../Components/UploadPostDialog/UploadPostDialog'
import { connect } from 'react-redux'
import { iPopUp } from '../../Interfaces/common'
import { showPopUpAction } from '../../redux/actions'

type props = {
    showPopUp: any
}

function PopUp({ type, show, showPopUp }: props & iPopUp) {
  const navigation = useNavigate();
  return (
    show ?
        <div className='overlay flexCenter'>
            <div className="overlayTop flexCenter">
            <span className="iconWrapper cross" onClick={()=>{showPopUp(false)}}>
                <CrossIcon/>
            </span>
            </div>
            {
                type === "uploadPost" &&
                <UploadPostDialog/>
            }
        </div>
    : <></>
  )
}

const mapStateToProps = (state: any)=>({
    type: state.global.popUp.type,
    show: state.global.popUp.show,
})

const mapDispatchToProps = (dispatch: any)=>({
    showPopUp: (data: iPopUp)=>{dispatch(showPopUpAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)