import React, { useEffect, useRef, useState } from 'react'
import './Reels.css'
import { ReactComponent as LoveIcon } from '../../Assets/icons/notification.svg';
import { ReactComponent as CommentIcon } from '../../Assets/icons/comment.svg';
import { ReactComponent as RocketIcon } from '../../Assets/icons/rocket.svg';
import { ReactComponent as SavedIcon } from '../../Assets/icons/saved.svg';
import { ReactComponent as ThreeDotIcon } from '../../Assets/icons/threeDot.svg';
import { ReactComponent as VerifyIcon } from '../../Assets/icons/verified.svg';
import { ReactComponent as NoVolumeIcon } from '../../Assets/icons/noVolume.svg';
import { connect } from 'react-redux';

type props = {
  windowWidth: number
}

function Reels(props: props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState<{height: number, width: number}>({height: 0, width: 0})

  useEffect(()=>{
    if(divRef.current){
      setDimension({
        width: (divRef.current?.clientWidth/3) - 40,
        height: 0
      })
    }
  }, [props.windowWidth])
  return (
    <div className="tab" ref={divRef}>
      <div className="reelsWrapper flexCenter width100">
        {
          [1,1,1,1,1].map((x)=>{
            return (
              <div className='reelAligner'>
                <div className="reelWrapper width100 flexCenter">
                  <div className="reel flexCenter">
                    <div className="reelVideoAlt" style={{width: `${dimension.width}px`}}>
                      <div className="reelVideoOverlay flexCenter">
                        <div className="volumeDiv width100 flexCenter">
                          <span className="volumeWrapper flexCenter">
                            <NoVolumeIcon/>
                          </span>
                        </div>
                        <div className="reelInfoDiv width100 flexCenter">
                          <div className="reelUserInfo flexCenter width100">
                            <div className="profileAlt"></div>
                            <div className="userinfo flexCenter">
                              <span className='userName flexCenter'>
                                enzo_editography <VerifyIcon/>
                              </span>
                              <span className="dot"></span>
                            </div>
                          </div>
                          <div className="captionDiv flexCenter width100">
                            <span className='captionText'>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="reelToolsDiv flexCenter">
                      <div className="reelTools flexCenter">
                        <div className="iconWrapper flexCenter">
                          <LoveIcon/>
                          <span className="toolText">518k</span>
                        </div>
                        <div className="iconWrapper flexCenter">
                          <CommentIcon/>
                          <span className="toolText">3,456</span>
                        </div>
                        <div className="iconWrapper flexCenter">
                          <RocketIcon/>
                        </div>
                        <div className="iconWrapper flexCenter saved">
                          <SavedIcon/>
                        </div>
                        <div className="iconWrapper flexCenter">
                          <ThreeDotIcon/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="spacer"></div>
              </div>
            )
          })
        }
      </div>
    </div>  
  )
}

const mapStateToProps = (state: any)=>({
  windowWidth: state.global.window.width
})

export default connect(mapStateToProps)(Reels)