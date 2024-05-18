import React, { useEffect, useRef, useState } from 'react'
import './Select.css'
import { ReactComponent as CaretIcon } from '../../Assets/icons/caret.svg'
import { iSelectOption } from '../../Interfaces/common'
import { ReactComponent as TickMarkIcon } from '../../Assets/icons/tickMark.svg'

type props = {
    value: string,
    options: iSelectOption[],
    onChange: any
}

function Select({value = "Select", options, onChange}: props) {
    const [dropdownPosition, setDropdownPosition] = useState<{x:string, y:string}>({ x: "0", y: "0" });
    const selectRef = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState<iSelectOption>();
    const [show, setShow] = useState<boolean>(false);

    useEffect(()=>{
        const target = selectRef?.current?.style;
        if(target){
            setDropdownPosition({x: target.left, y: String(parseInt(target.top) + parseInt(target.height)) + "px"})
        }
    },[]);

    useEffect(()=>{
        let find = options.find((x)=> x.value === value);
        if(find){
            setSelected(find);
        }
    }, [value])
  return (
    <div className='select flexCenter width100' onClick={()=>{setShow(!show)}} ref={selectRef}>
        <span className="value">{selected?.label ? selected.label : "Select"}</span>
        <span className="iconWrapper caret">
            <CaretIcon/>
        </span>
        {
            show &&
            <div className="optionsDropDown flexCenter" style={{left: dropdownPosition.x + "px", top: dropdownPosition.y}}>
                {
                    options.map((x)=>{
                        return (
                            <div className="selectOption flexCenter width100" onClick={(e)=>{
                                    setSelected(x); 
                                    onChange(x.value);
                                }}>
                                <span className="optionLabel">{x.label}</span>
                                <span className={`selectTick flexCenter ${x.value === selected?.value ? "true" : "false"}`}>
                                    <span className="iconWrapper tick flexCenter">
                                        <TickMarkIcon/>
                                    </span>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        }
    </div>
  )
}

export default Select