import React from 'react'
import './Button.css'
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner'

type props = {
    clicked?: any,
    text: string,
    disabled: boolean,
    loading?: boolean
}

function Button(props: props) {
  return (
    <div className={`button flexCenter ${props.disabled ? "disabled" : ""}`}>
        <button
            onClick={()=>{props.clicked()}}
            className='buttonInput flexCenter'
            disabled={props.disabled}
        >
          {props.text}
          {
            props.loading &&
            <ButtonSpinner/>
          }
        </button>
    </div>
  )
}

export default Button