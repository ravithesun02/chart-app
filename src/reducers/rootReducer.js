import {combineReducers} from 'redux';
import chartReducer from './chartReducer';

const rootReducer = combineReducers({
    chartData: chartReducer
})

export default rootReducer;