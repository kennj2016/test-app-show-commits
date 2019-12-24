import { TEST } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
};




export default (state = initialState, action = {}) => {
  switch(action.type) {

    case TEST:
    {
      return {...state}
    }

    default: return state;
  }
}
