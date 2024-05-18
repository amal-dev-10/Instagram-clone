import React, { useEffect, useState } from 'react'
import './Post.css'
import { ReactComponent as ThreeDotIcon } from '../../Assets/icons/threeDot.svg'
import { ReactComponent as LoveIcon } from '../../Assets/icons/notification.svg'
import { ReactComponent as CommentIcon } from '../../Assets/icons/comment.svg'
import { ReactComponent as RocketIcon } from '../../Assets/icons/rocket.svg'
import { ReactComponent as SavedIcon } from '../../Assets/icons/saved.svg'
import { ReactComponent as EmojiIcon } from '../../Assets/icons/emoji.svg'
import { ReactComponent as LikedIcon } from '../../Assets/icons/liked.svg'
import { useLocation } from 'react-router'
import { iCommentReply, iPost, iPostComment, iProfile, iResponse, iSavedPost } from '../../Interfaces/common'
import { fetchCommentReplies, getComments, getPostById, likePost, postComment, postSave } from '../../Service/api/User'
import { setCommentRepliesAction, setPostCommentsAction, setPostDataAction, setPostLikesAction, setSavedPostAction } from '../../redux/actions'
import { connect } from 'react-redux'
import SlideButton from '../SlideButton/SlideButton'
import { getDateDiffString } from '../../utils/common'
import ItemsIndicator from '../ItemsIndicator/ItemsIndicator'
import PostControls from '../PostControls/PostControls'

type props = {
  post: iPost,
  setPost: any,
  user: iProfile & {userName: string},
  setComments: any,
  setReplies: any,
}

type iCommentCardData = {
  userName: string,
  created: string,
  likes: number,
  _id: string,
  content?: string
}

type iCommenCard = {
  type: "caption" | "comment",
  data: iCommentCardData,
  repyClicked: any
}

function Post({ post, setPost, user, setComments, setReplies }: props) {
  const loc = useLocation();
  const [path, setPath] = useState<string>(loc.pathname);
  const [image, setImage] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<string>("");

  const getData = async()=>{
    let id = path.split("/")[2];
    let response: iResponse = await getPostById(id);
    if(response?.status === 200){
      setPost(response.data);
      getCommentsData()
    }
  }

  const getCommentsData = async()=>{
    let id = path.split("/")[2];
    let response: iResponse = await getComments(id);
    if(response?.status === 200){
      setComments(response.data)
    }
  }

  const sliderClicked = (dir: "left" | "right")=>{
    if(post.media?.length > 1){
      if(dir === "left"){
        if(image != 0){
          setImage(image - 1)
        }
  
      }else if(dir === "right"){
        if(image != post.media?.length - 1){
          setImage(image + 1)
        }
      }
    }
  }

  const postCommentClicked = async ()=>{
    if(comment){
      let data = {
        _commentId: commentId,
        replyingTo: replyingTo,
        content: comment,
        created: new Date().toUTCString(),
        _postId: post._id,
        userName: user.userName,
      }
      let response: iResponse = await postComment(data);
      if(response?.status === 200){
        setComment("");
        setReplyingTo("");
        setCommentId("");
        if(replyingTo){
          setReplies(response.data);
        }else{
          setComments(response.data);
        }
      }
    }
  }

  const getRepliesData = async (commentId: string)=>{
    let replies: iResponse = await fetchCommentReplies(commentId, post._id);
    if(replies?.status === 200){
      setReplies(replies.data);
    }
  }

  useEffect(()=>{
    if(replyingTo){
      let find = post.comments?.find((x)=> x.userName === replyingTo);
      if(find?._id){
        setComment("@" + find.userName + " " + comment);
      }
    }
  }, [replyingTo])

  useEffect(()=>{
    setPath(loc.pathname)
  }, [loc.pathname])

  useEffect(()=>{
    getData();
  }, [])
  return (
    <div className='singlePost width100 flexCenter'>
        <div className="postDiv flexCenter">
            <div className="postLeft flexCenter" style={{position: 'relative'}}>
              {
                image != 0 &&
                <SlideButton
                  clicked={()=>{sliderClicked("left")}}
                  type='left'
                />
              }
              {
                image != post?.media?.length-1 ? 
                  <SlideButton
                    clicked={()=>{sliderClicked("right")}}
                    type='right'
                  />
                : <></>
              }
              <div className="image" style={{backgroundImage: `url(${post?.media?.[image]})`}}></div>
              <div className="items flexCenter width100">
                {
                  post?.media?.length > 1 &&
                  <ItemsIndicator
                    selected={image}
                    items={post?.media?.length}
                  />
                }
              </div>
            </div>
            <div className="postRight flexCenter">
              {/* top */}
              <div className="postTop flexCenter width100">
                <div className="postTopLeft flexCenter">
                  <span className="profileAlt"></span>
                  <span className="userName">{post?.userName || ""}</span>
                </div>
                <span className="iconWrapper flexCenter">
                  <ThreeDotIcon/>
                </span>
              </div>
              {/* middle */}
              <div className="postComments flexCenter width100">
                <div className="postCommentWrapper flexCenter width100">
                  <CommentCard
                    data={{
                      userName: post?.userName || "",
                      _id: post?._userId,
                      created: post?.created,
                      likes: 0,
                      content: post?.caption || ""
                    }}
                    type='caption'
                    repyClicked={()=>{}}
                  />
                </div>
                {
                  post?.comments?.map((x)=>{
                    return (
                      <div className="postCommentWrapper flexCenter width100">
                        <CommentCard
                          data={{
                            userName: x?.userName,
                            _id: x?._id,
                            created: x?.created,
                            likes: x?.likes.length,
                            content: x?.content
                          }}
                          type='comment'
                          repyClicked={()=>{setCommentId(x._id); setReplyingTo(x.userName)}}
                        />
                        <div className="postCommentReplies flexCenter">
                          <span className="viewRepliesWrapper flexCenter">
                            <span className="line"></span>
                            <span className="viewRepliesBtn" onClick={()=>{getRepliesData(x._id)}}>{`View Replies`}</span>
                          </span>
                          {
                            x?.replies?.length ?
                            <div className="repliesWrapper flexCenter width100">
                              {
                                x?.replies?.map((r)=>{
                                  return (
                                    <CommentCard
                                      data={{
                                        userName: r?.userName,
                                        _id: r?._id,
                                        created: r?.created,
                                        likes: r?.likes.length,
                                        content: r?.content
                                      }}
                                      type='comment'
                                      repyClicked={()=>{setCommentId(x._id); setReplyingTo(r.userName)}}
                                    />
                                  )
                                })
                              }
                            </div> : <></>
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              {/* bottom */}
              <div className="postBottom1 flexCenter width100">
                <PostControls
                  data={post}
                  user={{_userId: user._userId, userName: user.userName}}
                />
                <div className="likesDiv flexCenter width100">
                  <span className="likesText">{post?.likes?.length} likes</span>
                  <span className="timeAgo">{getDateDiffString(post?.created) || "unknown"}</span>
                </div>
                <div className="addCommentDiv1 flexCenter width100">
                  <span className="iconWrapper emojiIcon">
                    <EmojiIcon/>
                  </span>
                  <input type="text" placeholder='Add a comment...' value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
                  <span className="postBtn" onClick={()=>{postCommentClicked()}}>Post</span>
                </div>
              </div>
              {/*  */}
            </div>
        </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  setPost: (data: iPost | null)=>{dispatch(setPostDataAction(data))},
  setComments: (data: iPostComment[])=>{dispatch(setPostCommentsAction(data))},
  setReplies: (data: iCommentReply[])=>{dispatch(setCommentRepliesAction(data))},
})

const mapStateToProps = (state: any)=>({
  post: state.post.data,
  user: state.user
})


const CommentCard = ({ data, type, repyClicked }: iCommenCard)=>{
  return (
    <div className="postComment flexCenter width100">
      <div className="postCommentLeft flexCenter">
        <div className="profileImageWrapper">
          <span className="profileAlt flexCenter"></span>
        </div>
        <div className="postCommentUserDetails flexCenter" style={{flex: "unset"}}>
          <span className="userName">
            <b>
              {data.userName + '  '}
            </b>
            {
              data.content
            }
          </span>
          <span className='flexCenter commentStats'>
            <span className="timeAgo">{getDateDiffString(data.created)}</span>
            {
              type != "caption" &&
              <>
                <span className="likes">{data?.likes} likes</span>
                <span className="replyBtn" onClick={()=>{repyClicked()}}>Reply</span>
              </>
            }
          </span>
        </div>
      </div>
      {
        type != "caption" &&
        <div className="postCommentRight">
          <span className="iconWrapper loveBtnIcon">
            <LoveIcon/>
          </span>
        </div>
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)