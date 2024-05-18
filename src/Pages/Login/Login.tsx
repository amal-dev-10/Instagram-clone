import React, { useEffect, useState } from 'react'
import './Login.css'
import TextBox from '../../Components/TextBox/TextBox'
import Button from '../../Components/Button/Button'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { Outlet, useLocation, useNavigate } from 'react-router';

function Login() {
  const nav = useNavigate()
  const location = useLocation();
  const [route, setRoute] = useState<string>("");

  useEffect(()=>{
    setRoute(location.pathname.split("/accounts")[1] || "");
  }, [])
  return (
    <div className='loginPage flexCenter'>
      <div className="wholeWrapper flexCenter">
        {/* <span style={{margin: "20px"}}></span> */}
        <Outlet/>
      </div>
    </div>
  )
}

export default Login