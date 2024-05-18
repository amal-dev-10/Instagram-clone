import React, { useEffect, useState } from 'react'
import './TextBox.css'
import { ReactComponent as TickMarkIcon } from '../../Assets/icons/tickMark.svg';
import { ReactComponent as XMarkIcon } from '../../Assets/icons/xMark.svg';

type props = {
    value: string,
    placeHolder: string,
    type: React.HTMLInputTypeAttribute,
    textChange?: any,
    onBlur?: any,
    onFocus?: any,
    valid?: boolean,
    disableValidation?: boolean
}

function TextBox(props: props) {
    const [val, setVal] = useState<string>(props.value);
    const [inputFocused, setInputFocused] = useState<boolean>(false)
    const [foc, setFoc] = useState<boolean>(false)

    const textBoxFocused = (target: React.ChangeEvent<HTMLInputElement>)=>{
        if(inputFocused && target.target.value){
            setFoc(true);
        }else{
            setFoc(false);
        }
    }

    useEffect(()=>{
        setVal(props.value);
    }, [props])

  return (
    <div className='textBox flexCenter'>
        <div className="textBoxLeftWrapper flexCenter">
            {
                foc &&
                <span className='topPlaceholder'>{props.placeHolder}</span>
            }
            <input 
                type={props.type} 
                placeholder={foc ? "" : props.placeHolder} 
                value={val}
                onChange={(e)=>{setVal(e.target.value); props.textChange(e.target.value); textBoxFocused(e)}}
                autoComplete='new-password'
                onFocus={(e)=>{setInputFocused(true)}}
                onBlur={()=>{setInputFocused(false); props.onBlur()}}
            />
        </div>
        {
            (props.valid != undefined && !props.disableValidation) &&
            <span className={`validSpan flexCenter ${props.valid ? "true" : "false"}`}>
                <span className={`icon flexCenter`}>
                    {
                        props.valid === true &&
                        <TickMarkIcon/>
                    }
                    {
                        props.valid === false &&
                        <XMarkIcon/>
                    }
                </span>
            </span>
        }
    </div>
  )
}

export default TextBox