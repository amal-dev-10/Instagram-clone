import React, { useEffect, useRef, useState } from 'react'
import './Profile.css'
import { ReactComponent as SettingsIcon } from '../../Assets/icons/settings.svg'
import { ReactComponent as LoveIcon } from '../../Assets/icons/notification.svg'
import { ReactComponent as CommentIcon } from '../../Assets/icons/comment.svg'
import { connect } from 'react-redux'
import { iButton, iPostPreview, iProfile, iResponse, iUser } from '../../Interfaces/common'
import { useLocation, useNavigate } from 'react-router'
import { followProfile, getAllPostsPreview, getUserProfileByUsername, startConversation } from '../../Service/api/User'
import { setPostsPreviewAction, setProfileDataAction } from '../../redux/actions'
import socket from '../../socket/socket'
import ButtonSpinner from '../../Components/ButtonSpinner/ButtonSpinner'

type props = {
    mobileMode: boolean,
    windowWidth: number,
    profile: iProfile & {_id: string, userName: string},
    setProfileData: any,
    user: iProfile & {userName: string},
    sePostsPreview: any,
    posts: iPostPreview[]
}

function Profile(props: props) {
    const navigate = useNavigate();
    const loc = useLocation();
    const postWrapper = useRef<HTMLDivElement>(null);
    const [postWidth, setPostWidth] = useState<string>("");
    // const [userName, setUserName] = useState<string>("");
    const [following, setFollowing] = useState<boolean>(false);
    const [messageBtn, setMessageBtn] = useState<iButton>({
        text: "Message",
        disabled: false
    })
 
    const getData = async (userName: string)=>{
        let res: iResponse = await getUserProfileByUsername(userName);
        if(res?.status === 200){
            props.setProfileData(res.data)
        }
        // if(!props.profile?._id){
        // }
    }

    const getAllPostsPreviewData = async (userName: string)=>{
        let res: iResponse = await getAllPostsPreview(userName);
        if(res?.status === 200){
            props.sePostsPreview(res.data);
        }
    }

    const followNowClicked = async ()=>{
        if(props.user._userId != props.profile._userId){
            let res: iResponse = await followProfile(props.profile._userId);
            if(res?.status === 200){
                props.setProfileData(res.data)
            }
        }
    }

    const goToChatClicked = async ()=>{
        let res: iResponse = await startConversation(props.profile._userId);
        if(res?.status === 200){
            navigate(`/direct/t/${res.data}`);
        }
    }

    useEffect(()=>{
        let findFollowing = props.profile.followers?.find((x)=> x._userId === props.user._userId);
        if(findFollowing){
            setFollowing(true);
        }else{
            setFollowing(false);
        }
    }, [props.profile])

    useEffect(()=>{
        let u = loc.pathname.split("/")[1];
        if(u){
            getData(u);
            getAllPostsPreviewData(u)
        }
    },[loc.pathname])

    useEffect(()=>{
        if(postWrapper.current){
            setPostWidth(`${(postWrapper.current.clientWidth - 10)/3}px`);
        }
    })

    useEffect(()=>{
        if(postWrapper.current){
            setPostWidth(`${(postWrapper.current.clientWidth - 10)/3}px`);
        }
    }, [props.windowWidth])
  return (
    <div className={"profileWrapper flexCenter"}>
        <div className={`profile flexCenter ${props.mobileMode ? "mobileMode" : ""}`}>
            <div className={`profileTop flexCenter width100 ${props.mobileMode ? "mobileMode" : ""}`}>
                <div className="profileTopLeft flexCenter">
                    <span className='profileAlt flexCenter'></span>
                </div>
                <div className="profileTopRight flexCenter">
                    <div className={`userAndTools flexCenter ${props.mobileMode ? "mobileMode" : ""}`}>
                        <span className="userName">{props.profile.userName}</span>
                        {
                            props.user.userName === props.profile.userName ?
                            <div className='btnWrapper flexCenter'> 
                                <span className="profileBtn" onClick={()=>{navigate("/accounts/edit")}}>
                                    Edit Profile
                                </span>
                                <span className="profileBtn">
                                    View archive
                                </span>
                                <span className="profileBtn">
                                    Ad toools
                                </span>
                                <SettingsIcon/>
                            </div> :
                            <div className='btnWrapper flexCenter'> 
                                <span className={`profileBtn ${following ? "unfollow" : "follow"}`} onClick={()=>{followNowClicked()}}>
                                    {following ? "Un Follow" : "Follow"}
                                </span>
                                <span className="profileBtn flexCenter" onClick={()=>{goToChatClicked()}}>
                                    {messageBtn.text}
                                    {
                                        messageBtn?.loading &&
                                        <ButtonSpinner/>
                                    }
                                </span>
                            </div>
                        }
                    </div>
                    {
                        !props.mobileMode &&
                        <StatsComponent
                            followers={String(props.profile?.followers?.length || 0)}
                            following={String(props.profile?.following?.length || 0)}
                            posts={String(props?.posts?.length || 0)}
                            mobileMode={props.mobileMode}
                        />
                    }
                    {
                        !props.mobileMode &&
                        <ProfileDetailsComponent
                            bio={props.profile?.bio || ""}
                            profileName={props.profile.fullName}
                            website={props.profile?.website || ""}
                        />
                    }
                </div>
            </div>
            {
                props.mobileMode &&
                <ProfileDetailsComponent
                    bio={props.profile?.bio || ""}
                    profileName={props.profile.fullName}
                    website={props.profile?.website || ""}
                />
            }
            {
                props.mobileMode &&
                <StatsComponent
                    followers={String(props.profile?.followers?.length || 0)}
                    following={String(props.profile?.following?.length || 0)}
                    posts={String(props?.posts?.length || 0)}
                    mobileMode={props.mobileMode}
                />
            }
            <div className={`profileBottom flexCenter width100 ${props.mobileMode ? "mobileMode" : ""}`}>
                <div className="bottomTab width100 flexCenter">
                    <div className="profileTab flexCenter tabSelected">
                        <span className='profileTabName'>POSTS</span>
                    </div>
                    <div className="profileTab flexCenter">
                        <span className='profileTabName'>REELS</span>
                    </div>
                    <div className="profileTab flexCenter">
                        <span className='profileTabName'>SAVED</span>
                    </div>
                    <div className="profileTab flexCenter">
                        <span className='profileTabName'>TAGGED</span>
                    </div>
                </div>
                <div className="profileBottomContents flexCenter width100">
                    <div className="flexCenter postsWrapper width100" ref={postWrapper}>
                        {
                            (props.posts || [0,0,0,0,0,0,0,0,0]).map((x)=>{
                                return (
                                    <div className="postAlt postPreviewImage width100" 
                                        style={{height: postWidth, width: postWidth, backgroundImage: `url(${x.media[0]})`}}
                                        onClick={(e)=>{e.stopPropagation(); navigate(`/p/${x._id}/`)}}
                                    >
                                        {/* <img src={x.media[0]} alt="" className='postPreviewImage'/> */}
                                        <div className="hoverDiv">
                                            <div className="stat flexCenter">
                                                <span className="iconWrapper">
                                                    <LoveIcon/>
                                                </span>
                                                <span className="statNumber">{x?.numberOfLikes || "0"}</span>
                                            </div>
                                            <div className="stat flexCenter">
                                                <span className="iconWrapper">
                                                    <CommentIcon/>
                                                </span>
                                                <span className="statNumber">{x?.numberOfComments || "0"}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
    mobileMode: state.global.mobileMode,
    windowWidth: state.global.window.width,
    profile: state.profile,
    user: state.user,
    posts: state.profile.posts
})

const mapDispatchToProps = (dispatch: any)=>({
    setProfileData: (data: iProfile & {_id: string})=>{dispatch(setProfileDataAction(data))},
    sePostsPreview: (data: iPostPreview[])=>{dispatch(setPostsPreviewAction(data))}
})

type iStatsProps = {
    following: string,
    posts: string,
    followers: string,
    mobileMode: boolean
}

type iProfileDetails = {
    profileName: string,
    bio: string,
    website: string,
}

const StatsComponent = ({ followers, following, posts, mobileMode }: iStatsProps)=>{
    return (
        <div className={`profileStats flexCenter ${mobileMode ? "mobileMode" : ""}`}>
            <span className="stat flexCenter">
                {posts}
                <span className="statTitle">posts</span>
            </span>
            <span className="stat flexCenter">
                {followers}
                <span className="statTitle">followers</span>
            </span>
            <span className="stat flexCenter">
                {following}
                <span className="statTitle">following</span>
            </span>
        </div>
    )
}

const ProfileDetailsComponent = ({ bio, profileName, website }: iProfileDetails)=>{
    return (
        <div className="profileDetails flexCenter">
            <span className="profileName">{profileName}</span>
            <span className="profileBio">{
                bio
            }</span>
            <a href="" className='link'>
                <span className="website">{website}</span>
            </a>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)