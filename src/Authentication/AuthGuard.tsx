import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import './AuthGuard.css'
import instagramImage from '../Assets/png/instagram.png'
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { iProfile, iResponse, iUser } from '../Interfaces/common';
import { setUserAction } from '../redux/actions';
import { getUserProfileByUsername } from '../Service/api/User';

type props = {
    testMode: boolean,
    user: undefined | any,
    setUser: any
}

function AuthGuard({ testMode = false, user, setUser }: props) {
  const navigate = useNavigate();
  const loc = useLocation();
  const [show, setShow] = useState<boolean>(true);

  const verifyToken = async ()=>{
    try{
      let token = localStorage.getItem("token") as string;
      if(token){
        const decoded = jwtDecode(token) as  JwtPayload & iProfile & {userName: string, _id: string};
        const currentTime = Date.now() / 1000;
        if(decoded.exp && decoded.exp < currentTime){
          return false
        }else if(!decoded?.exp){
          return false
        }
        let profileResponse:iResponse = await getUserProfileByUsername(decoded.userName);
        if(profileResponse?.status === 200){
          let profileData: iProfile & {userName: string} = profileResponse.data;
          setUser({
            _id: decoded._userId,
            _userId: profileData._userId,
            fullName: profileData.fullName,
            bio: profileData.bio,
            gender: profileData.gender,
            website: profileData.website,
            token: token,
            userName: profileData.userName,
            savedPost: profileData.savedPost
          } as iProfile & {token: string, userName: string});
          return true
        }else{
          return false
        }
      }else{
        return false
      }
      
    }catch(err){
      console.log("Authentication failed");
      return false
    }
  }

  const verify = async ()=>{
    let isAuthenticated: boolean = await verifyToken();
    if(!testMode && !isAuthenticated){
      navigate("/accounts/login")
    }else if(!testMode && isAuthenticated){
      if(
        loc.pathname.includes("/accounts/login") ||
        loc.pathname.includes("/accounts/emailsignup")
      ){
        navigate("/")
      }else{
        navigate(loc.pathname)
      }
    }
    setShow(false);
  }
  
  useEffect(()=>{
    verify()
  }, [])

  return (
    show ?
    <div className="splash flexCenter">
      <img src={instagramImage} alt="" className='img'/>
    </div> : <></>
  )
}

const mapStateToProps = (state: any)=>({
    user: state?.user
});

const mapDispatchToProps = (dispatch: any)=>({
  setUser: (data: iProfile &{token: string, userName: string})=>{dispatch(setUserAction(data))}
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard)