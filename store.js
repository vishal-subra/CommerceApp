import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userSignupReducer,
  userUpdateReducer,
  userGetProfileReducer,
  userSearchProfileReducer
} from './reducers/userReducers';
import {
  ProductStatusReducer,
  ProductUpdateReducer,
  ProductAddReducer,
  ProductDeleteReducer,
  ProductPopularStatusReducer,
  ProductVendorReducer
} from './reducers/productReducers';
import {
  CartStatusReducer,
  CartUpdateReducer,
  CartAddReducer,
  CartDeleteReducer

} from './reducers/cartReducers';
import { LeaderboardGetReducer } from './reducers/leaderboardReducers';
import {
  transactionStatusReducer
  } from './reducers/transactionReducers';


const initialState = {
  userSignin: { data: {}, loading: false, status: false, error: {} },
  userSignup: { data: {}, loading: false, status: false, error: {} },
  userCart:{data:{data:[],total:0},loading:false,status:false,error:{}},
  userProfile: { data: {}, loading: false, status: false, error: {} },
  userUpdate: { data: { data: [] }, loading: false, status: false, error: {} },
  leaderboard:{data:{data:[]},loading:false,status:false,error:{}},
  product:{data:[],loading:false,status:false,error:{}},
  popularproduct:{data:[],loading:false,status:false,error:{}},
  transaction:{data:[],loading:false,status:false,error:{}},
  userSearchProfile: { data: { data: [] }, loading: false, status: false, error: {} }
}

const reducer = combineReducers({
  userSearchProfile:userSearchProfileReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userProfile: userGetProfileReducer,
  userCart:CartStatusReducer,
  cartDelete:CartDeleteReducer,
  posts: userSigninReducer,
  userUpdate: userUpdateReducer,
  leaderboard:LeaderboardGetReducer,
  product:ProductStatusReducer,
  popularproduct:ProductPopularStatusReducer,
  transaction:transactionStatusReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store