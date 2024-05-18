import React, { useEffect, useState } from 'react'
import './TextArea.css'

type props = {
    value: string,
    textChanged: any,
    limit: number
}

function TextArea(props: props) {
    const [value, setValue] = useState<string>(props.value);
    const valueChanged = (val: string)=>{
        if(val.length <= props.limit){
            setValue(val);
            props.textChanged(val);
        }
    }
    useEffect(()=>{
        setValue(props.value)
    }, [props.value])
  return (
    <div className='textArea flexCenter width100'>
        <textarea name="" id="" onChange={(e)=>{valueChanged(e.target.value)}} value={value}></textarea>
        <div className="textAreaRight flexCenter">
            <span className='textLength'>{value.length}/{props.limit}</span>
        </div>
    </div>
  )
}

export default TextArea