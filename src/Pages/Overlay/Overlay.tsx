import React from 'react'
import './Overlay.css'
import { ReactComponent as CrossIcon } from '../../Assets/icons/cross.svg'
import { Outlet, useNavigate } from 'react-router'
import { connect } from 'react-redux';
import { resetPostReducerAction } from '../../redux/actions';

type props = {
  resetPost: any
}

function Overlay({ resetPost }: props) {
  const navigation = useNavigate();
  return (
    <div className='overlay flexCenter'>
      <div className="overlayTop flexCenter">
        <span className="iconWrapper closeIcon" onClick={()=>{resetPost(); navigation(-1)}}>
          <CrossIcon/>
        </span>
      </div>
      <Outlet/>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  resetPost: ()=>{dispatch(resetPostReducerAction(null))}
})

export default connect(null, mapDispatchToProps)(Overlay)