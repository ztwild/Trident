import { SEND_MESSAGE_START } from './chatActions';

const initialState = {
  messages: [
    { user: 'wildzac', message: 'see ya' },
    { user: 'wildzac', message: 'sounds good' },
    { user: 'other_guy', message: 'calm down' },
    { user: 'other_guy', message: 'its not that cool' },
    { user: 'wildzac', message: 'Cool dooooodd' },
    { user: 'other_guy', message: 'just working on a project' },
    { user: 'wildzac', message: 'you?' },
    { user: 'wildzac', message: 'not too much' },
    { user: 'other_guy', message: 'Hey, what up' },
    { user: 'wildzac', message: 'Hello' },
  ],
  error: null
}

const chatReducer = (state = initialState, action) => {
  if(action.type === SEND_MESSAGE_START){
    var newState = { ...state };
    newState.messages.unshift({message: action.payload});
    return newState;
  }
  return state;
};

export default chatReducer;