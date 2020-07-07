import { combineReducers } from "redux";

import { products } from "./products.reducer";
import authentication from "./auth.reducer";

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;
