import React from 'react'
import './SlideButton.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type props = {
    type: "left" | "right",
    clicked: any
}

function SlideButton(props: props) {
  return (
    <span className={`slider flexCenter ${props.type}`} onClick={()=>{props.clicked()}}>
        <ChevronRightIcon fontSize='inherit' className={`angleIcon ${props.type}`}/>
    </span>
  )
}

export default SlideButton