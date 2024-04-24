import { combineReducers } from 'redux';
import dataReducer from './slices/data.slice';


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  data: dataReducer,
});

export default reducer;