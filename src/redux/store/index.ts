import rootReducers from "../reducers";
import { createStore } from 'redux';

export const store = createStore(rootReducers);

export default store