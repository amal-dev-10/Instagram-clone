import React, { useEffect, useState } from 'react'
import './LoginBox.css'
import TextBox from '../TextBox/TextBox';
import Button from '../Button/Button';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { resetLoginAction, setLoginInputValueAction, setUserAction } from '../../redux/actions';
import { iButton, iInput, iProfile, iResponse } from '../../Interfaces/common';
import { loginWithCredentials } from '../../Service/api/Login';
import { setLocalStorage } from '../../utils/common';

type props = {
    setLoginValue: any,
    inputs: iInput[],
    resetLogin: any,
    setUser: any
}

function LoginBox(props: props) {
    const [button, setButton] = useState<iButton>({
        disabled: true,
        text: "Log in",
        loading: false
    })
    const nav = useNavigate();

    const loginButtonClicked = async ()=>{
        setButton({...button, loading: true});
        try{
            let res: iResponse = await loginWithCredentials({
                emailOrMobileNumberOrUserName: props.inputs[0].value,
                password: props.inputs[1].value
            });
            if(res.status === 200){
                let data = res.data as iProfile & {token: string, userName: string};
                await setLocalStorage([
                    {key: "token", value: data.token},
                ]);
                props.setUser(data);
                nav("/")
            }
        }
        catch(err){
            console.log(err)
        }
        setButton({...button, loading: false});
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
            {
                props.inputs.map((x)=>{
                    return (
                        <TextBox
                            placeHolder={x.placeHolder || ""}
                            type={x.type}
                            value={x.value}
                            key={x.id}
                            textChange={(val: string)=>{props.setLoginValue({id: x.id, value: val})}}
                            disableValidation={true}
                            valid={x.valid}
                            onBlur={()=>{}}
                        />
                    )
                })
            }
            <Button
                text={button.text}
                clicked={()=>{loginButtonClicked()}}
                disabled={button.disabled}
                loading={button.loading}
            />

            <span className='orDivider flexCenter'>
                <span className='seperator'></span>
                <span>OR</span>
                <span className='seperator'></span>
            </span>
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
            <span className="forgotPassword">
                Forgot password?
            </span>
        </div>
        <div className="authContainer bottomAuthContainer">
            <span className='sentence'>Don't have an account? <span className='link' onClick={()=>{nav("/accounts/emailsignup")}}>Sign up</span></span>
        </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
    inputs: state.login.inputs
})

const mapDispatchToProps = (dispatch: any)=>({
    setLoginValue: (data: {id: string, value: string})=>{dispatch(setLoginInputValueAction(data))},
    resetLogin: ()=>{dispatch(resetLoginAction())},
    setUser: (data: iProfile & {token: string, userName: string})=>{dispatch(setUserAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)