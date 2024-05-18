import React, { useEffect, useRef, useState } from 'react'
import './Sidebar.css'
import {ReactComponent as Instagram} from '../../Assets/icons/instagram.svg'
import { connect } from 'react-redux'
import { iOption, iProfile } from '../../Interfaces/common'
import InstagramIcon from '@mui/icons-material/Instagram';
import Search from '../Search/Search'
import { SelectOptionAction, setExtensionAction, setMinifiedAction } from '../../redux/actions'
import { useLocation, useNavigate } from 'react-router'
import CreatePopUp from '../CreatePopUp/CreatePopUp'

type props = {
    options: iOption[],
    more: iOption,
    minified: boolean,
    mobileMode: boolean,
    setMinified: any,
    selectOption: any,
    setExtension: any,
    clickShowMore: any,
    clickCreate: any,
    extension: JSX.Element | null,
    user: iProfile & {userName: string}
}

function Sidebar({ options, more, minified, mobileMode, user, setMinified, selectOption, setExtension, clickShowMore, clickCreate, extension }: props) {
    const nav = useNavigate();
    const loc = useLocation();

    const showMoreClicked = ()=>{
        clickShowMore();
    }

    const optionClicked = (optionData: iOption)=>{
        switch(optionData.text.toLowerCase()){
            case "create":
                clickCreate();
                break;
            case "search":
            case "notifications":
                if(extension){
                    setMinified(false);
                    setExtension(null);
                }else{
                    setMinified(true);
                    setExtension(optionData?.behaviour?.extension || null)
                }
                break;
            default:
                setExtension(null);
                if(!mobileMode){
                    setMinified(false);
                }
                let r = optionData.route
                if(optionData.text.toLowerCase() === "profile"){
                    r = `/${user.userName}`
                }
                nav(r);
                selectOption(optionData.text);
                break;
        }
        if(extension){
            setMinified(false);
        }
    }

    useEffect(()=>{
        setExtension(null)
    }, [loc.pathname])
    
  return (
        <div className={`sidebar flexCenter ${minified ? 'minified' : ''} ${mobileMode ? "mobileBar" : ''}`}>
            <a href="" className='instaLink'>
                <div className="sideBarLogo flexCenter">
                    {
                        minified ?
                        <span className='minifiedLogo flexCenter'>
                            <InstagramIcon fontSize='inherit' className='insta'/>
                        </span>
                        :
                            <Instagram/>
                    }
                </div>
            </a>
            <div className="navOptions flexCenter">
                {
                    options.map((x, i:number)=>{
                        return (
                            !mobileMode || (x.text.toLowerCase() != "search" && x.text.toLowerCase() != "notifications") ?
                            <div className={`option flexCenter ${(x.selected && minified && !x?.behaviour?.popup) ? "borderSelection" : ""}`} style={{justifyContent: minified ? 'center' : ""}} key={"option" + i} onClick={()=>{optionClicked(x)}}>
                                <div className={`optionIconDiv`}>
                                    {
                                        x.logo ? 
                                        <x.logo/>
                                        : <span className='profileAlt flexCenter'></span>
                                    }
                                </div>
                                {
                                    !minified &&
                                    <div className="optionText flexCenter">
                                        <span className={`${x.selected ? "optionTextSelected" : ''}`}>{x.text}</span>
                                    </div>
                                }
                            </div> 
                            : <></>
                        )
                    })
                }
                
            </div>
            <div className="sidebarBottom">
                <div className="option flexCenter" onClick={()=>{
                    showMoreClicked()
                }}>
                    <div className="optionIconDiv">
                        {
                            more.logo ? 
                            <more.logo/>
                            : <></>
                        }
                    </div>
                    {
                        !minified &&
                        <div className="optionText flexCenter">
                            <span>{more.text}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
  )
}

const mapStatetToProps = (state: any)=>({
    options: state.home.options,
    more: state.home.more,
    minified: state.global.minified,
    mobileMode: state.global.mobileMode,
    extension: state.global.sideBarExtension,
    user: state.user
})

const mapDispatchToProps = (dispatch: any)=>({
    setMinified: (mini: boolean)=>{dispatch(setMinifiedAction(mini))},
    selectOption: (id: string)=>{dispatch(SelectOptionAction(id))},
    setExtension: (ext: JSX.Element | null)=>{dispatch(setExtensionAction(ext))}
})

export default connect(mapStatetToProps, mapDispatchToProps)(Sidebar)