import React, { useEffect, useState } from 'react'
import './SignupBox.css'
import Button from '../Button/Button';
import TextBox from '../TextBox/TextBox';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { iButton, iInput, iResponse, iSignUpData } from '../../Interfaces/common';
import { resetSignUpAction, setSignUpInputValidOrNot, setSignUpInputValueAction } from '../../redux/actions';
import { doesFieldExists, signupWithCredentials } from '../../Service/api/signup';
import { isEmail, isPhoneNumber } from '../../utils/common';

type props = {
    inputs: iInput[],
    setInputValue: any,
    setInputValid: any,
    resetSignUp: any
}

function SignupBox(props: props) {
    const [button, setButton] = useState<iButton>({
        disabled: true,
        text: "Sign Up"
    })
    const nav = useNavigate();
    const signUpWithUsernameAndPassword = async()=>{
        setButton({...button, loading: true});
        let inputsValid = props.inputs.every((x)=> x.valid);
        if(inputsValid){
            let data = {
                fullName: props.inputs[1].value,
                userName: props.inputs[2].value,
                password: props.inputs[3].value,
            } as iSignUpData
            if(isPhoneNumber(props.inputs[0].value)){
                data.mobileNumber = props.inputs[0].value
            }else if(isEmail(props.inputs[0].value)){
                data.email = props.inputs[0].value
            }
            let res: iResponse = await signupWithCredentials(data);
            if(res.status === 200){
                // props.resetSignUp();
                nav("/accounts/login");
            }
        }else{
            console.log("Enter all inputs!")
        }
        setButton({...button, loading: false});
    }
    const textBoxBlured = async (id: string, value: string)=>{
        if(value && (id === "email" || id === "userName")){
            let res: iResponse = await doesFieldExists(
                {
                    fieldName: id === "email" ? "emailOrPhoneNumber" : id,
                    value: value
                }
            );
            if(res.status === 200){
                props.setInputValid({id: id, valid: false})
            }else if(res.status === 404){
                props.setInputValid({id: id, valid: true})
            }
        }
    }   

    const textBoxValueChanged = (x: iInput, value: string)=>{
        props.setInputValue({id: x.id, value: value});
        textBoxBlured(x.id, value)
    }

    useEffect(()=>{
        let valid = props.inputs.every((x)=> x.valid);
        setButton({
            ...button,
            disabled: !valid
        })
    }, [props.inputs])
  return (
    <div className="authWrapper flexCenter">
        <div className="authContainer flexCenter">
            <i data-visualcompletion="css-img" aria-label="Instagram" className="instaLogo" role="img" 
            ></i>
            <span className='signupTitle'>{"Sign up to see photos and videos\nfrom your friends."}</span>
            <div className="button2Set flexCenter">
            <div className="button2 flexCenter">
                <FacebookRoundedIcon
                className='facebookIcon button2Icon'
                fontSize='small'
                />
                <span>Continue with Facebook</span>
            </div>
            <div className="button2 flexCenter">
                <GoogleIcon
                className='googleIcon button2Icon'
                fontSize='small'
                />
                <span>Continue with Google</span>
            </div>
            </div>
            <span className='orDivider flexCenter'>
            <span className='seperator'></span>
            <span>OR</span>
            <span className='seperator'></span>
            </span>
            <div className="inputDiv flexCenter">
                {
                    props.inputs.map((x, i: number)=>{
                        return (
                            <TextBox
                                placeHolder={x.placeHolder || ""}
                                type={x.type}
                                value={x.value}
                                key={x.id}
                                textChange={(val: string)=>{
                                    textBoxValueChanged(x, val)
                                }}
                                onBlur={()=>{textBoxBlured(x.id, x.value)}}
                                valid={x.valid}
                                disableValidation={false}
                            />
                        )
                    })
                }
            </div>
            <span className='tAndC'>People who use our service may have uploaded your contact information to Instagram. <span className='forgotPassword'>Learn More</span></span>
            <span className='tAndC'>By signing up, you agree to our <span className='forgotPassword'>Privacy Policy</span> and <span className='forgotPassword'>Cookies Policy</span></span>
            
            <Button
                text={button.text}
                clicked={()=>{signUpWithUsernameAndPassword()}}
                disabled={button.disabled}
                loading={button.loading}
            />
        </div>
        <div className="authContainer bottomAuthContainer">
            <span className='sentence'>Have an account? <span className='link' onClick={()=>{nav("/accounts/login")}}>Log in</span></span>
        </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
    inputs: state.signUp.inputs
})

const mapDispatchToProps = (dispatch: any)=>({
    setInputValue: (data: {id: string, value: string})=>{dispatch(setSignUpInputValueAction(data))},
    setInputValid: (data: {id: string, valid: boolean})=>{dispatch(setSignUpInputValidOrNot(data))},
    resetSignUp: ()=>{dispatch(resetSignUpAction())}
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupBox)