import React, { UIEventHandler, useEffect, useRef, useState } from 'react'
import './Home.css'
import { connect } from 'react-redux'
import SlideButton from '../../Components/SlideButton/SlideButton'
import { ReactComponent as MenuIcon } from '../../Assets/icons/threeDot.svg'
import { ReactComponent as RoundTickIcon } from '../../Assets/icons/roundTick.svg'
import { ReactComponent as PlusIcon } from '../../Assets/icons/plus.svg'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { iPaginationProperties, iPostPreviewMain, iProfile, iResponse, iUser } from '../../Interfaces/common'
import { fetchAllPosts } from '../../Service/api/User'
import { setMainPostPreviewAction } from '../../redux/actions'
import { getDateDiffString } from '../../utils/common'
import PostControls from '../../Components/PostControls/PostControls'
import ButtonSpinner from '../../Components/ButtonSpinner/ButtonSpinner'

interface props {
    minified: boolean,
    mobileMode: boolean,
    user: iProfile & {userName: string},
    postPreview: iPostPreviewMain[],
    setMainPreview: any
}

function Home({minified, mobileMode, user, postPreview, setMainPreview}: props) {
    const nav = useNavigate();
    const location = useLocation();
    const storyScrollRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const pageLimit = 2;
    const [lazyLoading, setLazyLoading] = useState<boolean>(false);
    const [fetchProperty, setFetchProperty] = useState<iPaginationProperties | null>(null);
    const [scrollWidth, setScrollWidth] = useState<number>(0);
    const [clientWidth, setClientWidth] = useState<number>(0);

    const storyScrolled = (e: React.UIEvent<HTMLDivElement, UIEvent>)=>{
        setScrollLeft(e.currentTarget.scrollLeft);
        setScrollWidth(e.currentTarget.scrollWidth);
        setClientWidth(e.currentTarget.clientWidth);
    }

    const sliderClicked = (type: "left" | "right")=>{
        if(storyScrollRef.current){
            storyScrollRef.current.scrollTo({
                left: type === "right" ? scrollLeft + 240 : scrollLeft - 240,
                behavior: "smooth"
            })
        }
    }

    const getData = async (property: iPaginationProperties | null)=>{
        if(property === null){
            property = {
                limit: pageLimit,
                page: 1
            }
        }
        if(!lazyLoading && fetchProperty?.page != property?.page && ((fetchProperty?.totalRecords != postPreview?.length) || (postPreview?.length || 0) === 0)){
            setLazyLoading(true);
            let res: iResponse = await fetchAllPosts(property || {limit: pageLimit, page: 1});
            if(res?.status === 200){
                setMainPreview(res.data.data);
                setFetchProperty(res.data.property);
            }
            setLazyLoading(false);
        }
    }

    const homeScrolling = (e: any)=>{
        let div = e.target as HTMLDivElement
        let scrollBottomDiff = div.scrollHeight - (div.clientHeight+div.scrollTop);
        if(scrollBottomDiff < 450 && scrollBottomDiff > 400 && !lazyLoading){
            let setProperty = {
                limit: pageLimit,
                page: (fetchProperty?.page || 0) + 1
            }
            getData(setProperty);
        }
    }
    
    useEffect(()=>{
        getData(fetchProperty);
    }, [fetchProperty])

    useEffect(()=>{
        getData(null)
    }, [])

  return (
        <div className={`homeRight ${mobileMode ? "mobileMode" : ""} flexCenter`} onScroll={homeScrolling}>
            <div className="main flexCenter">
                <div className="mainLeftWrapper flexCenter">
                    <div className="mainLeft flexCenter">
                        <div className="storiesDiv flexCenter">
                            <div 
                                className="storyWrapper flexCenter" 
                                onScroll={(e)=>{storyScrolled(e)}}
                                ref={storyScrollRef}
                            >
                                <div className="story flexCenter addYourStory">
                                    <span className="storyThumbnail">

                                        <span className="addStoryPlus flexCenter">
                                            <PlusIcon/>
                                        </span>
                                    </span>
                                    <span className='storyUsername'>Add Story</span>
                                </div>

                                {
                                    [1,2,3,45,45,43323,2323,0,0,0,0,0,0,0].map((x)=>{
                                        return (
                                            <div className="story flexCenter">
                                                <span className="storyThumbnail"></span>
                                                <span className='storyUsername'>Story</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                scrollLeft != 0 ?
                                <SlideButton type='left' clicked={()=>{sliderClicked("left")}}/>
                                : <></>
                            }
                            {
                                (scrollLeft === 0 && scrollLeft + clientWidth === scrollWidth) ||
                                scrollLeft + clientWidth != scrollWidth ?
                                <SlideButton type='right' clicked={()=>{sliderClicked("right")}}/> 
                                : <></>
                            }
                        </div>
                        <div className="postsView flexCenter">
                            {
                                (postPreview || [1,1,1,1]).map((x)=>{
                                    return (
                                        <div className={`postWrapper flexCenter ${x?.media ? "active" : ""}`}>
                                            <div className="postTop flexCenter width100">
                                                <div className="postAuthor flexCenter">
                                                    <span className="profileAlt"></span>
                                                    <div className="authorDiv flexCenter">
                                                        <span className="authorName">{x?.userName || "********"}</span>
                                                        {/* <span className="verifyIcon">
                                                            <VerifyIcon/>
                                                        </span> */}
                                                        <span className="dot"></span>
                                                        <span className="agoTime">{getDateDiffString(x?.created || "")}</span>
                                                    </div>
                                                </div>
                                                <div className="postTopRight">
                                                    <span className="iconButton">
                                                        <MenuIcon/>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="postContent width100 flexCenter">
                                                <span className="postImageAlt flexCenter">
                                                    <div className="mediaImage" style={{backgroundImage: `url(${x?.media?.[0]})`}}></div>
                                                    {
                                                        (x?.image || 0) != 0 &&
                                                        <SlideButton
                                                        clicked={()=>{}}
                                                        type='left'
                                                        />
                                                    }
                                                    {
                                                        (x?.image || 0) != x?.media?.length-1 ? 
                                                        <SlideButton
                                                            clicked={()=>{}}
                                                            type='right'
                                                        />
                                                        : <></>
                                                    }
                                                </span>
                                            </div>
                                            <div className="postBottom width100 flexCenter">
                                                <PostControls
                                                    data={x}
                                                    user={{userName: x.userName, _userId: x._userId}}
                                                />
                                                <div className="likesDiv flexCenter width100">
                                                    <span className="likesText">{x?.likes?.length || 0} likes</span>
                                                </div>
                                                <div className="userAndCaptionDiv flexCenter width100">
                                                    <span className="userNameText">
                                                        <b className='userName'>
                                                            {x.userName}
                                                        </b>
                                                        {
                                                            " "
                                                        }
                                                        {/* <VerifyIcon/>
                                                        {
                                                            " "
                                                        } */}
                                                        {x?.caption || ""}
                                                    </span>
                                                </div>
                                                <div className="viewAllCommentsDiv flexCenter width100">
                                                    <span onClick={()=>{nav(`p/${x._id}`, {state: {background: location}})}}>View all {x?.noOfComments} comments</span>
                                                </div>
                                                <div className="addCommentDiv flexCenter width100">
                                                    <input type="text" placeholder='Add a comment...'/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            lazyLoading &&
                            <div className="spinnerWrapper flexCenter width100">
                                <ButtonSpinner/>
                            </div>
                        }
                        {
                            !lazyLoading && (fetchProperty?.totalRecords === postPreview?.length) &&
                            <div className="caughtUp flexCenter width100">
                                <span className='flexCenter design'>
                                    <span className="designLine flexCenter"></span>
                                    <RoundTickIcon/>
                                    <span className="designLine flexCenter"></span>
                                </span>
                                <span className="caughtUpText">You're all caught up</span>
                            </div>
                        }
                    </div>
                </div>
                {
                    !mobileMode &&
                    <div className="mainRight flexCenter">
                        <div className="rightComponent flexCenter">
                            <div className="rightComponentTop width100">
                                <div className="profileCard flexCenter width100">
                                    <div className="profileDetailsWrapper flexCenter">
                                        <span className="profileAlt flexCenter"></span>
                                        <div className="profileDetails flexCenter">
                                            <span className="userName">{user.userName}</span>
                                            <span className="profileName">{user.fullName}</span>
                                        </div>
                                    </div>
                                    <span className="seeProfile">See profile</span>
                                </div>
                            </div>
                            {/* <div className="rightTitleDiv width100 flexCenter">
                                <span className='title'>Suggested for you</span>
                                <span className='titleBtn'>See all</span>
                            </div> */}
                            <div className="suggestedDiv">

                            </div>
                        </div>
                        <div className="disclaimerDiv flexCenter">
                            <span className="disclaimer">
                                This Instagram clone has been meticulously crafted solely for educational purposes, aiming to showcase the intricacies of web development. All intellectual property rights and trademarks are owned by Instagram. This project is not affiliated with, endorsed by, or sponsored by Instagram in any way.
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
  )
}

const mapStateToProps = (state: any)=>({
    minified: state.global.minified,
    mobileMode: state.global.mobileMode,
    user: state.user,
    postPreview: state.home.postPreview
})

const mapDispatchToProps = (dispatch: any)=>({
    setMainPreview: (data: iPostPreviewMain[])=>{dispatch(setMainPostPreviewAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)