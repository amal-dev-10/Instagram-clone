import React, { useEffect, useState } from 'react'
import './CreatePopUp.css'
import { connect } from 'react-redux'
import { iOption, iPopUp, iSubOption } from '../../Interfaces/common'
import { showPopUpAction } from '../../redux/actions'

type props = {
    options: iOption[],
    mobileMode: boolean,
    showPopUp: any,
    showCreate: any
}

function CreatePopUp(props: props) {
    const [create, setCreate] = useState<iSubOption[]>();

    const createClicked = (id: string)=>{
        if(id.toLowerCase() === "post"){
            props?.showPopUp({type: "uploadPost", show: true} as iPopUp);
            props?.showCreate(false)
        }
    }

    useEffect(()=>{
        let find = props?.options.find((x)=> x.text.toLowerCase() === "create");
        if(find){
            setCreate(find.subOptions);
        }
    }, [])
  return (
    <div className={`createPopUp flexCenter ${props?.mobileMode ? 'mobileMode' : ""}`}>
        {
            create?.map((x)=>{
                return (
                    <div className="createOption flexCenter" onClick={()=>{createClicked(x.text)}}>
                        <span>{x.text}</span>
                        {
                            x.logo ?
                            <x.logo/> : <></>
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

const mapStateToProps = (state: any)=>({
    options: state.home.options,
    mobileMode: state.global.mobileMode
})

const mapDispatchToProps = (dispatch: any)=>({
    showPopUp: (data: iPopUp)=>{dispatch(showPopUpAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePopUp)