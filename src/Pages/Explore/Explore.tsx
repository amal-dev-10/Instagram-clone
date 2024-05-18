import React, { useEffect, useRef, useState } from 'react'
import './Explore.css'
import { connect } from 'react-redux'

type props = {
  windowWidth: number
}

function Explore(props: props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(()=>{
    if(sectionRef.current){
      setWidth(sectionRef.current.clientWidth - 50);
    }
  }, [props.windowWidth])
  return (
    <div className="tab">
      <div className="exploreWholeWrapper">
        <div className="exploreWrapper flexCenter" ref={sectionRef}>
          {
            [1,1,1,1].map((x)=>{
              return (
                <div className="exploreSection flexCenter width100" style={{height: `${(width/3)*2}px`}}>
                  <div className="postsBlock flexCenter">
                    <div className="block postBlock"></div>
                    <div className="block postBlock"></div>
                    <div className="block postBlock"></div>
                    <div className="block postBlock"></div>
                  </div>
                  <div className="block reelBlock" style={{width: `${width/2}px`, height: `${(width/3)*2}px`}}></div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
  windowWidth: state.global.window.width
})

export default connect(mapStateToProps)(Explore)