import React, { useEffect, useState } from 'react'
import './TextBox2.css'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type props = {
  value: string,
  placeHolder: string,
  type: React.HTMLInputTypeAttribute,
  textChange?: any,
  logo?: any
}

function TextBox2(props: props) {
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const [val, setVal] = useState<string>(props.value);

  useEffect(()=>{
    setVal(props.value);
}, [props])
  return (
    <div className='textBox2 flexCenter'>
      {
        !inputFocused &&
        <props.logo className="textBoxLogo"/>
      }
      <input 
        type={props.type} 
        placeholder={props.placeHolder} 
        value={val}
        onChange={(e)=>{setVal(e.target.value); props.textChange(e.target.value)}}
        autoComplete='new-password'
        onFocus={()=>{setInputFocused(true)}}
        onBlur={()=>{setInputFocused(false)}}
      />
      {
        inputFocused &&
        <span className='cancelRoundX flexCenter' onClick={()=>{setVal("")}}>
          <CloseOutlinedIcon fontSize='inherit'/>
        </span>
      }
    </div>
  )
}

export default TextBox2