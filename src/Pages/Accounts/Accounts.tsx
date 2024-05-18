import React, { useEffect, useState } from 'react'
import './Accounts.css'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { connect } from 'react-redux'
import { iOption, iOptionsSection } from '../../Interfaces/common'

type props = {
  optionsSections: iOptionsSection[]
}

function Accounts(props: props) {
  const location = useLocation();
  const [path, setPath] = useState<string>("");
  const navigate = useNavigate();

  useEffect(()=>{
    setPath(location.pathname)
  }, [location.pathname]);

  return (
    <div className='accounts flexCenter'>
        <div className="accountsLeft flexCenter">
          <div className="optionsWrapper flexCenter width100">
            <span className='title'>Settings</span>
            {
              props?.optionsSections?.map((sec)=>{
                return (
                  <div className="optionsSection flexCenter width100">
                    <span className="sectionTitle">{sec.title}</span>
                    {
                      sec.options.map((option)=>{
                        return (
                          <div className={`optionCard flexCenter width100 ${path.includes(option.route) ? "selected" : ''}`} onClick={()=>{navigate(option.route)}}>
                            <span className="iconWrapper flexCenter">
                              {
                                option?.logo &&
                                <option.logo/>
                              }
                            </span>
                            <span className="optionText">{option.text}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="accountsRight">
            <Outlet/>
        </div>
    </div>
  )
}

const mapStateToProps = (state: any)=>({
  optionsSections: state.accounts.optionSections
})

export default connect(mapStateToProps)(Accounts)