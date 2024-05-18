import React from 'react'
import './MorePopUp.css'
import { connect } from 'react-redux'
import { iOption } from '../../Interfaces/common'

type props = {
    more: iOption,
    minified: boolean
}

function MorePopUp({ more, minified }: props) {
  return (
    <div className="morePopUp">
        {
            more.subOptions.map((x)=>{
                return (
                    <div className="option flexCenter" style={{justifyContent: minified ? 'center' : ""}}>
                        <div className="optionIconDiv">
                            {
                                x.logo ? 
                                    <x.logo/>
                                : <></>
                            }
                        </div>
                        <div className="optionText flexCenter">
                            <span>{x.text}</span>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

const mapStatetToProps = (state: any)=>({
    more: state.home.more,
    minified: state.global.minified
})

export default connect(mapStatetToProps)(MorePopUp)