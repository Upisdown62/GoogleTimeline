import { createStore } from "redux";
import rootReducer from "../_reducers/index";

const store = createStore(rootReducer);

export default store;