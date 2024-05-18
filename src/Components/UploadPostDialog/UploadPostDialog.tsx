import React, { useEffect, useRef, useState } from 'react'
import './UploadPostDialog.css'
import { ReactComponent as MediaIcon } from '../../Assets/icons/postOutline.svg'
import Button from '../Button/Button'
import { ReactComponent as ArrowIcon } from '../../Assets/icons/arrow.svg'
import { ReactComponent as CropIcon } from '../../Assets/icons/crop.svg'
import { ReactComponent as GalleryIcon } from '../../Assets/icons/gallery.svg'
import { ReactComponent as CrossMarkIcon } from '../../Assets/icons/xMark.svg'
import { ReactComponent as PlusIcon } from '../../Assets/icons/plus.svg'
import { ReactComponent as CaretIcon } from '../../Assets/icons/caret.svg'
import SlideButton from '../SlideButton/SlideButton'
import { Slider, ToggleButton } from '@mui/material'
import { IOSSwitch } from '../IOSSwitch/IOSSwitch'
import createApiInstance from '../../Service/axios/axios'
import { iPopUp } from '../../Interfaces/common'
import { showPopUpAction } from '../../redux/actions'
import { connect } from 'react-redux'

type iProcedure = {
  title: string,
  back: boolean,
  buttons: {title: string, nextProcedure: number}[],
  id: number
}

type iAdvancedSettings = {
  title: string,
  enabled: boolean,
  description: string,
  id: number
}

type iCropTool = {
  show: boolean,
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  subOptions: {icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>, text: string}[],
  id: number
}

type iCaption = {
  placeholder: string,
  value: string,
  limit: number,
}

type props = {
  showPopUp: any
}

function UploadPostDialog({ showPopUp }: props) {
  const selectRef = useRef<HTMLInputElement>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [caption, setCaption] = useState<iCaption>({
    limit: 2200,
    placeholder: "Write a caption...",
    value: ""
  })
  const [advancedSettings, setAdvancedSettings] = useState<iAdvancedSettings[]>([
    {
      description: "Only you will see the total number of likes and views on this post. You can change this later by going to the ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings.",
      enabled: true,
      title: "Hide like and view counts on this post",
      id: 0
    },
    {
      description: "You can change this later by going to the ··· menu at the top of your post.",
      enabled: false,
      title: "Turn off commenting",
      id: 1
    },
  ])
  const [selectedFiles, setSelectedFiles] = useState<{url: string, id: number, file: File}[]>();
  const [preview, setPreview] = useState<number>(0);
  const [cropTools, setCropTools] = useState<iCropTool[]>([
    {
      icon: CropIcon,
      show: false,
      subOptions: [],
      id: 0
    },
    {
      icon: GalleryIcon,
      show: false,
      subOptions: [],
      id: 1
    },
  ])
  const [procedures, setProcedures] = useState<iProcedure[]>([
    {
      title: "Create new post",
      back: false,
      buttons: [],
      id: 0
    },
    {
      title: "Crop",
      back: true,
      buttons: [{title: "Next", nextProcedure: 2}],
      id: 1
    },
    {
      title: "Create new post",
      back: true,
      buttons: [{title: "Share", nextProcedure: 4}],
      id: 2
    },
  ]);

  const [procedure, setProcedure] = useState<number>(0);

  const handleFiles = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;
    if(files?.length){
      let temp: {url: string, id: number, file: File}[] = [];
      if(selectedFiles?.length){
        temp = [...selectedFiles];
      }
      for(let i=0; i < files.length; i++){
        const file = files[i];
        const fileType = file.type.split("/")[0];
        temp.push({url: URL.createObjectURL(file), file: file, id: i})
        if(fileType === "image"){

        }else if(fileType === "video"){
          
        }
      }
      setSelectedFiles([...temp])
      setProcedure(1)
    }
  }

  const sliderClicked = (dir: "left" | "right")=>{
    if(selectedFiles && selectedFiles?.length > 1){
      if(dir === "left"){
        if(preview != 0){
          setPreview(preview - 1)
        }
  
      }else if(dir === "right"){
        if(preview != selectedFiles?.length - 1){
          setPreview(preview + 1)
        }
      }
    }
  }

  const toolClicked = (id: number)=>{
    const t = cropTools.map((x)=>{
      if(x.id === id){
        x.show = !x.show
      }
      return x
    });
    setCropTools(t);
  }

  const removePostPreview = (id: number)=>{
    if(selectedFiles?.length){
      let findIndex: number = selectedFiles?.findIndex((x)=> x.id === id);
      if(findIndex > -1){
        let temp = selectedFiles;
        temp?.splice(findIndex, 1);
        setSelectedFiles([...temp]);
      }
    }
  }

  const changeAdvancedSettings = (id: number)=>{
    let t = advancedSettings.map((x)=>{
      if(x.id === id){
        x.enabled = !x.enabled
      }
      return x
    });
    setAdvancedSettings(t)
  }

  const backClicked = ()=>{
    if(procedure - 1 === 0){
      setSelectedFiles([]); 
    }
    setProcedure(procedure - 1)
  }

  const topButtonClicked = (next: number)=>{
    if(procedure === 2 && selectedFiles?.length){
      let formData = new FormData();
      for(const file of selectedFiles){
        formData.append("media", file.file);
      }
      formData.append("caption", caption.value);
      formData.append("advancedSettings", JSON.stringify({
        hideLikeAndView: advancedSettings[0].enabled,
        hideComment: advancedSettings[1].enabled
      }));
      createApiInstance("multipart/form-data").api.post("user/post", formData).then((x)=>{
        showPopUp({
          show: false,
          type: null
        } as iPopUp)
      })
    }else{
      setProcedure(next)
    }
  }

  useEffect(()=>{
    if(!selectedFiles?.length){
      setProcedure(0);
    }
  }, [selectedFiles])

  return (
    <div className={`uploadDialog flexCenter ${procedure === 2 ? "extend" : ''}`}>
      <input 
        type="file" 
        style={{display: "none"}} 
        accept='image/*, video/*' 
        multiple 
        onChange={(e)=>{handleFiles(e)}}
        ref={selectRef}
      />
      <div className="top flexCenter width100">
        {
          procedures[procedure].back &&
          <span className="iconWrapper arrow flexCenter" onClick={()=>{backClicked()}}>
            <ArrowIcon/>
          </span>
        }
        <span className='title'>{procedures[procedure].title}</span>
        <div className="butttonsWrapper flexCenter">
          {
            procedures[procedure].buttons.map((x)=>{
              return (
                <span className="textBtn" onClick={()=>{
                  topButtonClicked(x.nextProcedure)
                }}>{x.title}</span>
              )
            })
          }
        </div>
      </div>
      <div className="uploadPostBottom flexCenter width100">
        {
          procedure === 0 &&
          <div className="flexCenter dialogBottom width100">
            <span className="iconWrapper media flexCenter">
              <MediaIcon/> 
            </span>
            <span className='desc'>Drag photos and videos here</span>
            <div className="btnWrapper">
              <Button
                disabled={false}
                text='Select from computer'
                clicked={()=>{selectRef.current?.click()}}
              />
            </div>
          </div>
        }
        {
          (procedure === 1 || procedure === 2) && selectedFiles &&
          <div className="dialogBottom previewWrapper width100 flexCenter">
            <div style={{backgroundImage: `url(${selectedFiles[preview]?.url})`}} className='preview'></div>
            {
              procedure != 2 &&
              <div className="cropProcedureBottom flexCenter width100">
                <div className="wrapper flexCenter width100">  
                  {
                    cropTools.map((x)=>{
                      return (
                        <div className="toolWrapper flexCenter" onClick={()=>{toolClicked(x.id)}}>
                          <span className="tool flexCenter">
                            <x.icon/>
                          </span>
                          {
                            x.show && x.id === 1 &&
                            <div className="allPosts flexCenter">
                              {
                                selectedFiles.map((x)=>{
                                  return (
                                    <div 
                                      className="postPreview" onClick={(e)=>{e.stopPropagation();removePostPreview(x.id)}}
                                      style={{backgroundImage: `url(${x.url})`}}
                                    >
                                      <span className="iconWrapper flexCenter cross">
                                        <CrossMarkIcon/>
                                      </span>
                                    </div>
                                  )
                                })
                              }
                              <span className="addPost flexCenter plus" onClick={(e)=>{e.stopPropagation(); selectRef.current?.click()}}>
                                <PlusIcon/>
                              </span>
                            </div>
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
            {
              selectedFiles.length > 1 ? 
                <>
                  {
                    preview != 0 &&
                    <SlideButton
                      clicked={()=>{sliderClicked("left")}}
                      type='left'
                    />
                  }
                  {
                    preview != selectedFiles.length-1 ? 
                      <SlideButton
                        clicked={()=>{sliderClicked("right")}}
                        type='right'
                      />
                    : <></>
                  }
                </>
              : <></>
            }
          </div>
        }
        {
          procedure === 2 &&
          <div className="bottomRight flexCenter">
            <div className="postForm flexCenter width100">
              <div className="postFormTop flexCenter width100">
                <span className="profileAlt"></span>
                <span className="userName">amal_x_dev</span>
              </div>
              <div className="captionDiv flexCenter width100">
                <textarea 
                  name="caption" 
                  id="caption" 
                  placeholder={caption.placeholder} 
                  value={caption.value}
                  onChange={(e)=>{setCaption({...caption, value: e.target.value})}}
                ></textarea>
                <div className="textAreaTools flexCenter width100">
                  <span className='lengthCount'>12/100</span>
                </div>
              </div>
              <div className="otherOptionsDiv flexCenter width100">
                <div className="sec flexCenter width100">
                  <div className="divisionTop flexCenter width100" onClick={()=>{setShowAdvanced(!showAdvanced)}}>
                    <span style={{fontWeight: `${showAdvanced ? "500" : "unset"}`}}>Advanced Settings</span>
                    <span className={`iconWrapper ${showAdvanced ? "open" : ''}`}>
                      <CaretIcon/>
                    </span>
                  </div>
                  {
                    showAdvanced &&
                    <div className="divisionContent flexCenter width100">
                      {
                        advancedSettings.map((x)=>{
                          return (
                            <div className="setting flexCenter width100">
                              <div className="contentTop flexCenter width100">
                                <span className="title">{x.title}</span>
                                <span>
                                  <IOSSwitch
                                    checked={x.enabled}
                                    onChange={()=>{changeAdvancedSettings(x.id)}}
                                    size='small'
                                  />
                                </span>
                              </div>
                              <div className="contentBottom flexCenter width100">
                                <span className="desc">{x.description}</span>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any)=>({
  showPopUp: (data: iPopUp)=>{dispatch(showPopUpAction(data))}
})

export default connect(null, mapDispatchToProps)(UploadPostDialog)