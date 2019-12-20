import { combineReducers } from 'redux';
import currentUserData from './App/currentUserData';
import tableData from './App/tableData';

export default combineReducers({
    currentUser: currentUserData,
    table: tableData
});
