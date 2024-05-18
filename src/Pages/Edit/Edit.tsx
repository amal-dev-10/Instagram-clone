import React, { useEffect, useState } from 'react'
import "./Edit.css"
import Button from '../../Components/Button/Button'
import { connect } from 'react-redux'
import { iAccountInput, iButton, iProfile, iResponse, iSelectOption, iUser, updatableProfile } from '../../Interfaces/common'
import TextArea from '../../Components/TextArea/TextArea'
import Select from '../../Components/Select/Select'
import { changeEditInputAction, mapValueToEditInputsAction, setProfileDataAction, setUserAction, updateUserDataAction } from '../../redux/actions'
import { updateUserProfile } from '../../Service/api/User'

type props = {
  inputs: iAccountInput[],
  gender: iSelectOption[],
  changeEditInputs: any,
  setProfileData: any,
  // profile: iProfile & {_id: string, userName: string},
  user: iProfile & {userName: string},
  updateUserData: any,
  mapValueToInputs: any
}

function Edit(props: props) {
  const [submitButton, setSubmitButton] = useState<iButton>({
    disabled: true,
    text: "Submit"
  });

  const submitButtonClicked = async ()=>{
    setSubmitButton({...submitButton, loading: true});
    let res:iResponse = await updateUserProfile({
      website: props.inputs[0].value,
      bio: props.inputs[1].value,
      gender: props.inputs[2].value
    } as updatableProfile);

    if(res?.status != 500 && res?.status === 200){
      props.setProfileData(res.data);
      props.updateUserData(res.data);
    }
    setSubmitButton({...submitButton, loading: false});
  }

  useEffect(()=>{
    props.mapValueToInputs([
      {id: "bio", value: props.user?.bio || ""},
      {id: "website", value: props.user?.website || ""},
      {id: "gender", value: props.user?.gender || ""}
    ]);
  }, [])

  useEffect(()=>{
    if(props.inputs.some((x)=> x.value)){
      setSubmitButton({...submitButton, disabled: false});
    }else{
      setSubmitButton({...submitButton, disabled: true});
    }
  }, [props.inputs])
  return (
    <div className='edit flexCenter'>
      <div className="editWrapper flexCenter">
        <span className="title">Edit Profile</span>
        <div className="profileCard width100 flexCenter">
          <div className="profileCardLeft flexCenter">
            <span className="profileAlt flexCenter"></span>
            <span className="flexCenter profileDetail">
              <span className="userName">{props.user.userName}</span>
              <span className="profileName">{props.user.fullName}</span>
            </span>
          </div>
          <div className="profileCardRight flexCenter">
            <Button
              disabled={false}
              text='Change photo'
              clicked={()=>{}}
            />
          </div>
        </div>
        {
          props.inputs.map((x)=>{
            return (
              <div className="inputWrapper width100 flexCenter">
                <span className="inputTitle">{x.title}</span>
                {
                  x.inputType === "input" &&
                  <div className="specialInput width100 flexCenter">
                    <input type="text" placeholder='' value={x?.value} onChange={(e)=>{props.changeEditInputs({id: x.id, value: e.target.value})}}/>
                  </div>
                }

                {
                  x.inputType === "textArea" &&
                  <TextArea value={x.value || ""} textChanged={(e: string)=>{
                    props.changeEditInputs({id: x.id, value: e})
                  }} limit={150}/>
                }

                {
                  x.inputType === "select" &&
                  <Select value={x.value || ""} options={props?.gender || []} onChange={(e: string)=>{
                    props.changeEditInputs({id: x.id, value: e})
                  }}/>
                }
              </div>
            )
          })
        }
        <div className="btnDiv flexCenter width100">
          <div className="buttonWrapper flexCenter">
            <Button
              text={submitButton.text}
              disabled={submitButton.disabled}
              clicked={()=>{submitButtonClicked()}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
  inputs: state.accounts.edit.inputs,
  gender: state.accounts.edit.gender,
  user: state.user
});

const mapDispatchToProps = (dispatch: any)=>({
  changeEditInputs: (data: {id: string, value: string})=>{dispatch(changeEditInputAction(data))},
  setProfileData: (data: iProfile & {_id: string})=>{dispatch(setProfileDataAction(data))},
  updateUserData: (data: updatableProfile)=>{dispatch(updateUserDataAction(data))},
  mapValueToInputs: (data: {id: string, value: string}[])=>{dispatch(mapValueToEditInputsAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)