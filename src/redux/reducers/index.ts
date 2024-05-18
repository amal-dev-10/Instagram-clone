import { combineReducers } from "redux";
import { home } from "./Home";
import { globalReducer } from "./Global";
import { MessagesReducer } from "./Messages";
import { signUpReducer } from "./Signup";
import { LoginReducer } from "./Login";
import { userReducer } from "./User";
import { accountsReducer } from "./Accounts";
import { profileReducer } from "./Profile";
import { postReducer } from "./Post";
import { searchReducer } from "./Search";

const rootReducers = combineReducers({
    home: home,
    global: globalReducer,
    messages: MessagesReducer,
    signUp: signUpReducer,
    login: LoginReducer,
    user: userReducer,
    accounts: accountsReducer,
    profile: profileReducer,
    post: postReducer,
    search: searchReducer
})

export default rootReducers