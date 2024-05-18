import { iAction, iOption, iPostPreviewMain } from "../../Interfaces/common"
import { ReactComponent as HomeIcon } from '../../Assets/icons/home.svg'
import { ReactComponent as SearchIcon } from '../../Assets/icons/search.svg'
import { ReactComponent as ExploreIcon } from '../../Assets/icons/explore.svg'
import { ReactComponent as ReelIcon } from '../../Assets/icons/reel.svg'
import { ReactComponent as MessageIcon } from '../../Assets/icons/message.svg'
import { ReactComponent as NotificationIcon } from '../../Assets/icons/notification.svg'
import { ReactComponent as CreateIcon } from '../../Assets/icons/create.svg'
import { ReactComponent as MoreIcon } from '../../Assets/icons/more.svg'
import { ReactComponent as SettingsIcon } from '../../Assets/icons/settings.svg'
import { ReactComponent as ActivityIcon } from '../../Assets/icons/activity.svg'
import { ReactComponent as SaveIcon } from '../../Assets/icons/saved.svg'
import { ReactComponent as AppearanceIcon } from '../../Assets/icons/appearance.svg'
import { ReactComponent as InfoIcon } from '../../Assets/icons/info.svg'
import { ReactComponent as ThreadIcon } from '../../Assets/icons/threads.svg'
import { ReactComponent as PostIcon } from '../../Assets/icons/post.svg'
import { ReactComponent as liveVideoIcon } from '../../Assets/icons/liveVideo.svg'
import Search from "../../Components/Search/Search"
import Notifications from "../../Components/Notifications/Notifications"

type props = {
    options: iOption[],
    more: iOption,
    postPreview?: iPostPreviewMain[];
}

let initialState: props = {
    options: [
        {
            route: "/",
            selected: false,
            subOptions: [],
            text: "Home",
            logo: HomeIcon,
            behaviour:{
                sidebarMinified: false,
                popup: false,
            },
            id: "home"
        },
        {
            route: "",
            selected: false,
            subOptions: [],
            text: "Search",
            logo: SearchIcon,
            behaviour: {
                popup: false,
                sidebarMinified: true,
                extension: <Search/>
            },
            id: "search"
        },
        {
            route: "/explore/",
            selected: false,
            subOptions: [],
            text: "Explore",
            logo: ExploreIcon,
            behaviour: {
                popup: false,
                sidebarMinified: false,
            },
            id: "explore"
        },
        {
            route: "/reels/243d324d2g",
            selected: false,
            subOptions: [],
            text: "Reels",
            logo: ReelIcon,
            behaviour: {
                popup: false,
                sidebarMinified: false,
            },
            id: "reels"
        },
        {
            route: "/direct/inbox/",
            selected: false,
            subOptions: [],
            text: "Messages",
            logo: MessageIcon,
            behaviour: {
                popup: false,
                sidebarMinified: true,
            },
            id: "messages"
        },
        {
            route: "",
            selected: false,
            subOptions: [],
            text: "Notifications",
            logo: NotificationIcon,
            behaviour: {
                popup: false,
                sidebarMinified: true,
                extension: <Notifications/>
            },
            id: "notifications"
        },
        {
            route: "",
            selected: false,
            subOptions: [
                {
                    route: "",
                    text: "Post",
                    logo: PostIcon
                },
                {
                    route: "",
                    text: "Live video",
                    logo: liveVideoIcon
                }
            ],
            text: "Create",
            logo: CreateIcon,
            behaviour: {
                popup: true,
                sidebarMinified: true,
            },
            id: "create"
        },
        {
            route: "/",
            selected: false,
            subOptions: [],
            text: "Profile",
            behaviour: {
                popup: false,
                sidebarMinified: false,
            },
            id: "profile"
        },
    ],
    more: {
        route: "",
        selected: false,
        subOptions: [
            {
                route: "",
                text: "Settings",
                logo: SettingsIcon
            },
            {
                route: "",
                text: "Your Activity",
                logo: ActivityIcon
            },
            {
                route: "",
                text: "Saved",
                logo: SaveIcon
            },
            {
                route: "",
                text: "Switch Appearance",
                logo: AppearanceIcon
            },
            {
                route: "",
                text: "Report a problem",
                logo: InfoIcon
            },
            {
                route: "",
                text: "Threads",
                logo: ThreadIcon
            },
            {
                route: "",
                text: "Switch Accounts",
            },
            {
                route: "",
                text: "Log out",
            },
        ],
        text: "More",
        logo: MoreIcon,
        behaviour: {
            popup: true,
            sidebarMinified: false
        },
        id: "more"
    }
}
export const home = (state = initialState, action: iAction)=>{
    switch(action.type){
        case "SET_HOME_LIKED_POST":
            let postId: string = action.payload.id;
            let posts = state?.postPreview?.map((x)=>{
                if(x._id === postId){
                    x.likes = action.payload.data;
                }
                return x
            })
            return {
                ...state,
                postPreview: posts
            }
        case "SET_MAIN_POST_PREVIEW":
            let newArray = action.payload as iPostPreviewMain[];
            let d: iPostPreviewMain[] = state?.postPreview || [];
            newArray.forEach((x)=>{
                let find = state?.postPreview?.find((y)=> y._id === x._id);
                if(!find){
                    d.push(x);
                }
            });
            console.log(newArray)
            return {
                ...state,
                postPreview: [...d]
            }
        case "SELECT_OPTION":
            let temp = state.options.map((x)=>{
                if(x.text.toLowerCase() === action.payload.toLowerCase()){
                    x.selected = true;
                }else{
                    x.selected = false;
                }
                return x
            });
            return {
                ...state,
                options: [...temp]
            }
        case "SET_SIDEBAR":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}