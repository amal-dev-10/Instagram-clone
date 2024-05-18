import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Location, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { connect } from 'react-redux';
import Explore from './Pages/Explore/Explore';
import Reels from './Pages/Reels/Reels';
import Messages from './Pages/Messages/Messages';
import LoginBox from './Components/LoginBox/LoginBox';
import SignupBox from './Components/SignupBox/SignupBox';
import NoChatView from './Components/NoChatView/NoChatView';
import ChatBox from './Components/ChatBox/ChatBox';
import Root from './Pages/Root/Root';
import Profile from './Pages/Profile/Profile';
import Overlay from './Pages/Overlay/Overlay';
import NoMatchingRoute from './Pages/NoMatchingRoute/NoMatchingRoute';
import Post from './Components/Post/Post';
import AuthGuard from './Authentication/AuthGuard';
import Edit from './Pages/Edit/Edit';
import Accounts from './Pages/Accounts/Accounts';
import PopUp from './Pages/PopUp/PopUp';

function App() {
  let location  = useLocation();
  let background = location.state && location.state.background;
  return (
    <div className="App flexCenter">
      <AuthGuard testMode={false}/>
      <Routes location={background || location.state?.background}>
        <Route path='accounts' Component={Login}>
          <Route path='login' Component={LoginBox}/>
          <Route path='emailsignup' Component={SignupBox}/>
        </Route>
        <Route path='/' Component={Root}>
          <Route path='p' Component={Overlay}>
            <Route path=':id' Component={Post}/>
          </Route>
          <Route index Component={Home}/>
          <Route path='explore' Component={Explore}/>
          <Route path='reels/:id/' Component={Reels}/>
          <Route path=':id' Component={Profile}/>
          <Route path='direct' Component={Messages}>
            <Route path='inbox' Component={NoChatView}/>
            <Route path='t/:id' Component={ChatBox}/>
          </Route>
          <Route path='accounts' Component={Accounts}>
            <Route path='edit' Component={Edit}/>
            <Route path='*' Component={NoMatchingRoute}/>
          </Route>
          <Route path='*' Component={NoMatchingRoute}/>
        </Route>
      </Routes>

      {
        background && (
          <Routes>
            <Route path='p' Component={Overlay}>
              <Route path=':id' Component={Post}/>
            </Route>
          </Routes>
        )
      }
      <PopUp/>
    </div>
  );
}

export default connect(null, null)(App);
