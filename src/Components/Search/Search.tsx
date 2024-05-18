import React, { useEffect, useState } from 'react'
import './Search.css'
import TextBox2 from '../TextBox2/TextBox2'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { iResponse, iSearchedResult } from '../../Interfaces/common';
import { ReactComponent as XMarkIcon } from '../../Assets/icons/xMark.svg'
import { getSearchUsers } from '../../Service/api/User';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import { useNavigate } from 'react-router';
import { setExtensionAction } from '../../redux/actions';
import store from '../../redux/store';

function Search() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [searchedResult, setSearchedResult] = useState<iSearchedResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getSearchData = async ()=>{
    setLoading(true);
    let res: iResponse = await getSearchUsers(searchText);
    if(res?.status === 200){
      setSearchedResult(res?.data as iSearchedResult[]);
    }
    setLoading(false);
  }

  const cardClicked = (d: iSearchedResult)=>{
    navigate(`/${d.userName}`);
    let recent = JSON.parse(localStorage.getItem("recentSearches") || "[]") as iSearchedResult[];
    let find = recent.find((x)=> x._userId === d._userId)
    if(!find){
      recent.push(d);
      localStorage.setItem("recentSearches", JSON.stringify(recent));
    }
  }
  
  useEffect(()=>{
    if(searchText){
      getSearchData();
    }else{
      setSearchedResult([])
    }
  }, [searchText])

  return (
    <div className="searchMainDiv flexCenter">
      <div className="searchTop width100 flexCenter">
        <div className="searchTitle width100 flexCenter">
          <span className="searchText">Search</span>
        </div>
        <div className="searchBarMainDiv width100 flexCenter">
          <div className="searchBarDiv">
            <TextBox2
              placeHolder='Search'
              type='text'
              value={searchText}
              logo={SearchOutlinedIcon}
              textChange={(e: string)=>{setSearchText(e)}}
            />
          </div>
          {
            loading &&
            <ButtonSpinner/>
          }
        </div>
      </div>
      <div className="border width100 flexCenter">
        <span className="seperator"></span>
      </div>
      <div className="searchWrapper flexCenter width100">
        {
          searchedResult?.length 
          ? 
          <div className="con searchResultsDiv flexCenter width100">
            {
              searchedResult?.map((x)=>{
                return (
                  <SearchCard data={x} type='result' clicked={()=>{cardClicked(x)}}/>
                )
              })
            }
          </div> 
          : 
          <RecentSearches/>
        }
      </div>
    </div>
  )
}

interface iSearchCardProps {
  data: iSearchedResult,
  type: "recent" | "result",
  clicked: any
}

const SearchCard = ({ data, type, clicked }: iSearchCardProps)=>{
  const cardClicked = (d: iSearchedResult)=>{
    clicked()
  }
  return (
    <div className="searchCard width100 flexCenter" onClick={()=>{cardClicked(data)}}>
      <span className="profileAlt flexCenter"></span>
      <div className="searchCardDetails flexCenter">
        <span className="username">{data.userName}</span>
        <span className="fullName">{data.fullName}</span>
      </div>
      <div className="clearDiv">
        {
          type === "recent" &&
          <XMarkIcon className='clearIcon'/>
        }
      </div>
    </div>
  )
}

const RecentSearches = ()=>{
  const [recentSearches, setRecentSearches] = useState<iSearchedResult[]>([]);
  const navigate = useNavigate();

  const cardClicked = (d: iSearchedResult)=>{
    navigate(`/${d.userName}`);
  }
  
  useEffect(()=>{
    let locData = JSON.parse(localStorage.getItem('recentSearches') || "[]");
    setRecentSearches(locData)
  }, [])

  return (
    <div className="recentSearchesDiv width100 flexCenter">
      <div className="recentTitle width100 flexCenter">
        <span className="recentText">Recent</span>
      </div>
      <div className="recentSearchContent flexCenter">
        {
          recentSearches.map((x)=>{
            return (
              <SearchCard data={x} type='recent' clicked={()=>{cardClicked(x)}}/>
            )
          })
        }
        {
          !recentSearches.length ? 
          <div className="noRecentWrapper flexCenter">
            <span className="noRecent">No recent searches.</span>
          </div>
          : <></>
        }
      </div>
    </div>
  )
}

export default Search;