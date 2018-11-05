import { SET_HOSTNAME_START } from './connectionActions';
import { clone } from '../utils/deepClone';

const initialState = {
  hostname: "localhost"
}

const connectionReducer = (state = initialState, action) => {
  if(action.type === SET_HOSTNAME_START){
    var newState = clone(state);
    newState.hostname = action.payload;
    return newState;
  }
  return state;
};

export default connectionReducer;