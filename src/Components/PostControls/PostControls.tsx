import React, { useEffect, useState } from 'react'
import { ReactComponent as LoveIcon } from '../../Assets/icons/notification.svg'
import { ReactComponent as CommentIcon } from '../../Assets/icons/comment.svg'
import { ReactComponent as RocketIcon } from '../../Assets/icons/rocket.svg'
import { ReactComponent as SavedIcon } from '../../Assets/icons/saved.svg'
import { ReactComponent as LikedIcon } from '../../Assets/icons/liked.svg'
import './PostControls.css'
import { iPost, iPostPreviewMain, iProfile, iResponse, iSavedPost, iUser } from '../../Interfaces/common'
import { likePost, postSave } from '../../Service/api/User'
import { setHomePostPreviewLikesAction, setPostLikesAction, setSavedPostAction } from '../../redux/actions'
import { connect } from 'react-redux'

type props = {
    data: iPost | iPostPreviewMain,
    user: {_userId: string, userName: string},
    adminUser: iProfile,
    setPostLikes: any, 
    setSavedPost: any,
    setHomePostPreviewLikes: any
}



function PostControls({ data, user, adminUser, setPostLikes, setSavedPost, setHomePostPreviewLikes }: props) {
    const [postLiked, setPostLiked] = useState<0 | 1>(0);
    const [saved, setSaved] = useState<boolean>(false);
    const [mainData, setMainData] = useState<iPost | iPostPreviewMain>(data)
    
    const postSaveClicked = async ()=>{
        let res: iResponse = await postSave(mainData._id, {save: !saved});
        if(res?.status === 200){
          setSavedPost(res.data);
          //
        }
    }

    const likeClicked = async ()=>{
        let liked: 0 | 1 = 0;
        if(postLiked === 0){
          liked = 1
        }else if(postLiked === 1){
          liked = 0
        }
        let like: iResponse = await likePost({
          postId: mainData._id,
          like: liked,
          userName: user.userName
        });
        if(like?.status === 200){
          setPostLikes(like.data);
          setHomePostPreviewLikes({id: mainData._id, data: like.data})
          updateLikeStatus();
        }
    }

    const updateLikeStatus = ()=>{
        let liked: 0 | 1 = 0;
        if(data?.likes){
          let find = data?.likes?.find((x)=> x._userId === user._userId);
          if(find){
            liked = 1;
          }else{
            liked = 0;
          }
        }
        setPostLiked(liked);
      }
    
      const updateSavedStatus = ()=>{
        let find = adminUser?.savedPost?.find((x)=> x._postId === data?._id);
        if(find){
          setSaved(true);
        }else{
          setSaved(false);
        }
      }
    
      useEffect(()=>{
        updateLikeStatus();
        updateSavedStatus();
        setMainData(data)
      }, [data])

      useEffect(()=>{
        updateSavedStatus();
      }, [adminUser])

  return (
    <div className="postBottomTop width100 flexCenter">
        <div className="postBottomTopLeft flexCenter">
            <span className="iconButton" onClick={()=>{likeClicked()}}>
            {
                postLiked === 0 ?
                <LoveIcon/>
                : postLiked === 1 ? <LikedIcon className='liked'/> : <></>

            }
            </span>
            <span className="iconButton">
                <CommentIcon/>
            </span>
            <span className="iconButton">
                <RocketIcon/>
            </span>
        </div>
        <div className="postBottomTopRight flexCenter">
            <span className={`iconButton saveIcon ${saved ? "saved" : ""}`} onClick={postSaveClicked}>
                <SavedIcon/>
            </span>
        </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
    adminUser: state.user
})

const mapDispatchToProps = (dispatch: any)=>({
    setPostLikes: (data: [])=>{dispatch(setPostLikesAction(data))},
    setSavedPost: (data: iSavedPost[])=>{dispatch(setSavedPostAction(data))},
    setHomePostPreviewLikes: (data: any)=>{dispatch(setHomePostPreviewLikesAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(PostControls)

